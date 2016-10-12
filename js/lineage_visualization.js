/////////////////////////////////////////////////////////
// js used to generate figure for alife 2016 paper (evo stepping stones for plasticity)
/////////////////////////////////////////////////////////

// Load relevant things from settings
var currentTreatment = default_treatment;
var settings = lineage_vis_settings;
var data_fpath = lineage_vis_data_fpath;        // Data path for lineage sequence data

var zoom_mult             = 0.20;       // User setting

// canvas parameters; TODO: move all of these values to param js file
var margin = {top: 20, right: 40, bottom: 20, left: 100};
var frame_width = 940;
var frame_height = 1500;
var canvas_width = frame_width - margin.left - margin.right;
var canvas_height = frame_height - margin.top - margin.bottom;

// Some constants:
var spacer_length = 30;

var tooltip = d3.select("body")
                        .append("div")
                        .attr({"class": "t-tip"})
                        .style("position", "absolute")
                        .style("z-index", "10")
                        .style("visibility", "hidden");

var treatments = [];
var envsByTreatment = {};
var repsByTreatment = {};

var generateEnvironmentSequence = function(treatment_name) {
  var environment_sequence = [];  // empty out environment sequence
  var environment_codes = settings[treatment_name]["environment_codes"];
  var max_update = settings[treatment_name]["maximum_update"];
  var cycle_length = settings[treatment_name]["environment_cycle_length"];
  var prev_environment = -1;
  for (var i = 0; i < max_update; i += cycle_length) {
    var start_update = i;
    var duration = cycle_length;
    // clip duration to not go above max_update
    if (duration > max_update) {
      duration = max_update - start_update;
    }
    // Get current environment
    var cur_environment = (prev_environment + 1) % environment_codes.length;
    // Add environment to sequence
    environment_sequence.push({"environment": environment_codes[cur_environment], "start": start_update, "duration": duration});
    // Update previous environment
    prev_environment = cur_environment;
  }
  return environment_sequence;
}

// Data Loading Function
var data_accessor = function(row) {
  var treatment = row.treatment;
  var replicate = row.replicate;
  var final_plastic = row.plastic;
  var states = row.lineage_coded_phenotype_sequence.split("-");
  var state_durations = row.lineage_coded_duration_updates.split("-").map(Number);
  var state_entries = row.lineage_coded_start_updates.split("-").map(Number);
  var state_sequence = [];
  for (i = 0; i < states.length; i++) {
    state_sequence.push({state: states[i], duration: state_durations[i], start: state_entries[i]});
  }
  if (treatments.indexOf(treatment) == -1) {
    envsByTreatment[treatment] = generateEnvironmentSequence(treatment);
    repsByTreatment[treatment] = [];
    treatments.push(treatment);
  }
  if (repsByTreatment[treatment].indexOf(replicate) == -1) {
    repsByTreatment[treatment].push(replicate);
  }
  return {
    treatment: treatment,
    rep_id: replicate,
    final_plastic: final_plastic,
    state_sequence: state_sequence
  };
}

var slice_env_sequence = function(sequence, slice_ranges) {
  // Given environment sequence, slice to display ranges
  var sliced_env = []
  for (var si = 0; si < sequence.length; si++) {
    for (var ri = 0; ri < slice_ranges.length; ri++) {
      var start = sequence[si]["start"];
      var end = sequence[si]["duration"] + start;
      if ((start <= slice_ranges[ri][1] && start >= slice_ranges[ri][0]) ||
          (end <= slice_ranges[ri][1] && end >= slice_ranges[ri][0]) ||
          start <= slice_ranges[ri][0] && end >= slice_ranges[ri][1]) {
          var clipped_state = {"environment": sequence[si]["environment"], "start": start, "duration": sequence[si]["duration"], "true_start": start, "true_duration": sequence[si]["duration"]};
          if (start < slice_ranges[ri][0]) {
            clipped_state.start = slice_ranges[ri][0];
            clipped_state.duration = end - clipped_state.start;
          }
          if (end > slice_ranges[ri][1]) {
            clipped_state.duration = slice_ranges[ri][1] - clipped_state.start;
          }
          sliced_env.push(clipped_state);
      }
    }
  }
  return sliced_env;
}

var slice_data = function(data, slice_ranges) {
  // Given data (list of lineage objects produced by data accessor function) and ranges to slice data into,
  //  slices state sequence data based on predefined ranges
  var sliced_data = [];
  for (var i = 0; i < data.length; i++) {
    var sliced_lineage = {treatment: data[i].treatment, rep_id: data[i].rep_id, final_plastic: data[i].final_plastic, state_sequence: []};
    // for each piece of data (lineage), make new sliced lineage
    for (var si = 0; si < data[i].state_sequence.length; si++) {
      // for each state in lineage, check to see if we're keeping it; if so, add to sliced lineage
      for (var ri = 0; ri < slice_ranges.length; ri++) {
        // if state starts in range, or ends in range, or completely eclipses slice
        var start = data[i].state_sequence[si].start;
        var end = start + data[i].state_sequence[si].duration;
        if ((start <= slice_ranges[ri][1] && start >= slice_ranges[ri][0]) ||
            (end <= slice_ranges[ri][1] && end >= slice_ranges[ri][0]) ||
            start <= slice_ranges[ri][0] && end >= slice_ranges[ri][1]) {
          // clip to range if necessary
          var clipped_state = {state: data[i].state_sequence[si].state, duration: data[i].state_sequence[si].duration, start: data[i].state_sequence[si].start, true_start: data[i].state_sequence[si].start, true_duration: data[i].state_sequence[si].duration};
          if (start < slice_ranges[ri][0]) {
            clipped_state.start = slice_ranges[ri][0];
            clipped_state.duration = end - clipped_state.start;
          }
          if (end > slice_ranges[ri][1]) {
            clipped_state.duration = slice_ranges[ri][1] - clipped_state.start;
          }
          sliced_lineage.state_sequence.push(clipped_state);
        }
      }
    }
    sliced_data.push(sliced_lineage);
  }
  return sliced_data;
}

var data_callback = function(data) {
  /* This function is called when D3 loads data. */

  //currentTreatment = treatments[0];
  // Setup the canvas
  var chart_area = d3.select("#chart_area");
  var frame = chart_area.append("svg");
  var canvas = frame.append("g");
  var env_canvas = canvas.append("g").attr({"class": "env_canvas"});
  var data_canvas = canvas.append("g").attr({"class": "data_canvas"});

  // Get user input
  var display_full = $("slice_toggle").prop("checked");
  var display = $('input[name="display"]:checked').val();

  var refreshDash = function() {
    /* This function refreshes the visualization dashboard. */
    // Populate the treatment dropdown
    var treatmentDropDown = $("#treatment-selection-dropdown");
    treatmentDropDown.empty();
    $.each(treatments, function(i, p) {
      var li = $("<li/>")
                .appendTo(treatmentDropDown);
      var a = $("<a/>")
                .attr({"value": this, "href": "#"})
                .text(lineage_vis_settings[this]["hr_name"])
                .appendTo(li);
    });
    // Update the treatment button label
    var treatDDButton = $("#treatment_selector").text(settings[currentTreatment]["hr_name"]);
    $("<span/>").attr({"class": "caret"}).appendTo(treatDDButton);
    // Setup component listeners. (these get nuked when I nuke the dropdown with the empty function)
    $(document).ready(function() {
      // Treatment selector
      $("#treatment-selection-dropdown li a").click(function() {
        var selection = $(this).attr("value");
        // Update the current treatment
        currentTreatment = selection;
        // call for an update
        update();
      });
    });
  }


  var update = function() {
    /* Here's update the page/where we draw the visualization. */
    // Refresh the dash
    refreshDash();
    // We need to know what data we'll be looking at before we can update the frame/canvas.
    var treatmentData = data.filter(function(d) { return d.treatment == currentTreatment; } )
                            .filter(function(d) { if (display == "plastic") {
                                                    return d.final_plastic == "True";
                                                  } else if (display == "nonplastic") {
                                                    return d.final_plastic == "False";
                                                  } else if (display == "all") {
                                                    return d;
                                                  }
                                                });
    // Now we have all of the relevant data to draw. Filter through slicer.
    var sliceRanges = null;
    if (display_full) {
      sliceRanges = [[0, settings[currentTreatment]["maximum_update"]]];
    } else {
      sliceRanges = settings[currentTreatment]["sliced_ranges"];
    }

    var getRangeID = function(state_sequence_obj) {
      // Given state sequence object, determine which range it belongs to
      for (var i = 0; i < sliceRanges.length; i++) {
        if (state_sequence_obj.start <= sliceRanges[i][1] && state_sequence_obj.start >= sliceRanges[i][0]) {
          return i;
        }
      }
      // failure...
      return -1;
    }
    var displayData = slice_data(treatmentData, sliceRanges);
    // Filter environment through slicer.
    var slicedEnvironment = slice_env_sequence(envsByTreatment[currentTreatment], sliceRanges);
    // calculate total display range magnitude
    var total_range = 0
    for (var i = 0; i < sliceRanges.length; i++) {
      total_range += sliceRanges[i][1] - sliceRanges[i][0];
    }
    // Update frame/canvas parameters
    frame_width = $("#vis_panel").width() - 20;
    frame_height = total_range * zoom_mult;
    canvas_width = frame_width - margin.left - margin.right;
    canvas_height = frame_height - margin.top - margin.bottom;
    frame.attr({"width": frame_width, "height": frame_height});
    canvas.attr({"transform": "translate(" + margin.left + "," + margin.top + ")"});
    x_domain = [0, repsByTreatment[currentTreatment].length * 1.25 + 3];    // Range of values x can take on
    y_domain = [0, settings[currentTreatment]["maximum_update"]];            // Range of values y can take on
    ///////////////////////////////////////////////////////
    // Update vertical axis
    ///////////////////////////////////////////////////////
    // SETUP X AXIS -- this shouldn't change on an update
    // clean up old axes
    canvas.selectAll("g.x_axis").remove();
    canvas.selectAll("text#x_axis_label").remove();
    var xScale = d3.scale.linear();
    xScale.domain(x_domain).range([0, canvas_width]);
    var xAxis = d3.svg.axis().scale(xScale).tickValues([]).orient("top");
    canvas.append("g").attr({"class": "x_axis"}).call(xAxis);
    // axis labels
    canvas.append("text").attr({"id": "x_axis_label", "class": "axis_label", "x":xScale(20), "y": -10})
                        .style("text-anchor", "middle")
                        .text("");
    // clean up old axes
    canvas.selectAll("g.y_axis").remove();
    canvas.selectAll("text#y_axis_label").remove();
    // update scales/axes
    var yScales = [];
    var prev_range_end = 0;
    for (var i = 0; i < sliceRanges.length; i++) {
      var current_range_end = prev_range_end + ( ( (sliceRanges[i][1] - sliceRanges[i][0]) / total_range) * (canvas_height - (spacer_length * (sliceRanges.length - 1))))
      var yScale = d3.scale.linear();
      yScale.domain(sliceRanges[i]).range([prev_range_end, current_range_end]);
      yScales.push(yScale);
      prev_range_end = current_range_end + spacer_length;
      var tick_num = (sliceRanges[i][1] - sliceRanges[i][0]) / settings[currentTreatment]["update_label_interval"];
      var yAxis = d3.svg.axis().scale(yScale).ticks(tick_num).orient("left");
      canvas.append("g").attr({"class": "y_axis", "id": "y_axis-" + i}).call(yAxis);
    }
    // update axis label
    canvas.append("text").attr({"id": "y_axis_label", "class": "axis_label", "x": 0 - (canvas_height/2), "y": 0 - (margin.left / 1.5), "transform": "rotate(-90)"})
                          .style("text-anchor", "middle")
                          .text("Update");
    ///////////////////////////////////////////////////////
    // Draw environment indicator
    ///////////////////////////////////////////////////////
    var env_blocks = env_canvas.selectAll("rect").data(slicedEnvironment);
    env_blocks.enter().append("rect");
    env_blocks.exit().remove();
    env_blocks.attr({"y": function(d) { var si = getRangeID(d); return yScales[si](d.start); },
                                                    "x": function(d) { return xScale(0); },
                                                    "width": function(d) { return 10; },
                                                    "height": function(d) { var si = getRangeID(d); return yScales[si](sliceRanges[si][0] + d.duration) - yScales[si](sliceRanges[si][0]); },
                                                    "class": function(d) { return d.environment; },
                                                });
    env_blocks.on("mouseover", function(d) {
                                var cur_env = lookup_table[d.environment];
                                return tooltip.style("visibility", "visible")
                                              .html("Environment: " + cur_env + "<br/>Start Update: " + d.true_start + "<br/>Duration: " + d.true_duration);
                              })
              .on("mousemove", function() { return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px"); })
              .on("mouseout", function() { return tooltip.style("visibility", "hidden"); });
    ///////////////////////////////////////////////////////
    // Draw display data
    ///////////////////////////////////////////////////////
    // Add group for each lineage
    var lineages = data_canvas.selectAll("g").data(displayData, function(d) { return d.rep_id; });
    lineages.enter().append("g");
    lineages.exit().remove();
    lineages.attr({"id": function(d) { return d.rep_id; }});
    // Add rectangle for each state in sequence
    lineages.each(function(lin_d, i) {
      var state_blocks = d3.select(this)
                            .selectAll("rect").data(lin_d.state_sequence);
      var rep_id_num = +lin_d.rep_id.split("_")[lin_d.rep_id.split("_").length - 1];
      state_blocks.enter().append("rect");
      state_blocks.exit().remove();
      state_blocks.attr({"y": function(d) { var si = getRangeID(d); return yScales[si](d.start); },
                         "x": function(d) { return xScale(1.25 * i + 3); },
                         "height": function(d) { var si = getRangeID(d); return yScales[si](sliceRanges[si][0] + d.duration) - yScales[si](sliceRanges[si][0]); },
                         "width": function(d) { return xScale(0.98); },
                         "class": function(d) { return "C" + d.state; }
                       });
      /* Things to display: state, start, duration*/
      state_blocks.on("mouseover", function(d) {
                                  var tasks_performed = lookup_table["tasks_performed"][d.state];
                                  return tooltip.style("visibility", "visible")
                                                .html("<table>" +
                                                      "<tr><th colspan='2'>Task Table</th></tr>" +
                                                      "<tr><td> ENV-NAND </td><td> ENV-NOT </td></tr>" +
                                                      "<tr><td>"+ tasks_performed["ENV-NAND"] +"</td><td>"+ tasks_performed["ENV-NOT"] + "</td></tr>" +
                                                      "</table>" + "<br/>Start update: " + d.true_start  + "<br/>Duration: " + d.true_duration);
                                })
                .on("mousemove", function() { return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px"); })
                .on("mouseout", function() { return tooltip.style("visibility", "hidden"); });
    });
  }

  // Okay, now update the drawing
  update();
  // Page component listeners
  $(document).ready(function () {
    // lineage type filtering
    $("input[type='radio']").on("change", function(){
        display = $('input[name="display"]:checked').val();
        console.log(display);
        update();
    });
    // treatment selection
    $(".dropdown-menu li a").click(function(){
      // update treatment name
      currentTreatment = $(this).attr("value");
      update();
    });
    // zoom
    $("#vis_zoom_in").click(function() {
      // zoom in!
      zoom_mult = zoom_mult + zoom_rate;
      if (zoom_mult > 1.0) {
        zoom_mult = 1.0;
      }
      update();
    });
    $("#vis_zoom_out").click(function() {
      // zoom out!
      zoom_mult = zoom_mult - zoom_rate;
      if (zoom_mult < 0.05) {
        zoom_mult = 0.05;
      }
      update();
    });

    // slice vs. full
    $("#slice_toggle").change(function() {
      display_full = $(this).prop("checked");
      update();
    });

    $(window).resize(function () {
      update();
    });
  });
}

var main = function() {
  // Load data from csv
  d3.csv(data_fpath, data_accessor, data_callback);
}



main();
