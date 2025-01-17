/*!

=========================================================
* Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard
* Copyright 2018 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

//
// Bootstrap Datepicker
//

'use strict';

var Datepicker = (function() {

	// Variables

	var $datepicker = $('.datepicker');


	// Methods

	function init($this) {
		var options = {
			disableTouchKeyboard: true,
			autoclose: true,
			format: 'yyyy-mm-dd'
		};

		$this.datepicker(options);
	}


	// Events

	if ($datepicker.length) {
		$datepicker.each(function() {
			init($(this));
		});
	}

})();

//
// Icon code copy/paste
//

'use strict';

var CopyIcon = (function() {

	// Variables

	var $element = '.btn-icon-clipboard',
		$btn = $($element);


	// Methods

	function init($this) {
		$this.tooltip().on('mouseleave', function() {
			// Explicitly hide tooltip, since after clicking it remains
			// focused (as it's a button), so tooltip would otherwise
			// remain visible until focus is moved away
			$this.tooltip('hide');
		});

		var clipboard = new ClipboardJS($element);

		clipboard.on('success', function(e) {
			$(e.trigger)
				.attr('title', 'Copied!')
				.tooltip('_fixTitle')
				.tooltip('show')
				.attr('title', 'Copy to clipboard')
				.tooltip('_fixTitle')

			e.clearSelection()
		});
	}


	// Events
	if ($btn.length) {
		init($btn);
	}

})();

//
// Form control
//

'use strict';

var FormControl = (function() {

	// Variables

	var $input = $('.form-control');


	// Methods

	function init($this) {
		$this.on('focus blur', function(e) {
        $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');
	}


	// Events

	if ($input.length) {
		init($input);
	}

})();

//
// Google maps
//

var $map = $('#map-canvas'),
    map,
    lat,
    lng,
    color = "#5e72e4";

function initMap() {

    map = document.getElementById('map-canvas');
    lat = map.getAttribute('data-lat');
    lng = map.getAttribute('data-lng');

    var myLatlng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
        zoom: 12,
        scrollwheel: false,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":color},{"visibility":"on"}]}]
    }

    map = new google.maps.Map(map, mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'Hello World!'
    });

    var contentString = '<div class="info-window-content"><h2>Argon Dashboard</h2>' +
        '<p>A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</p></div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
}

if($map.length) {
    google.maps.event.addDomListener(window, 'load', initMap);
}

// //
// // Headroom - show/hide navbar on scroll
// //
//
// 'use strict';
//
// var Headroom = (function() {
//
// 	// Variables
//
// 	var $headroom = $('#navbar-main');
//
//
// 	// Methods
//
// 	function init($this) {
//
//     var headroom = new Headroom(document.querySelector("#navbar-main"), {
//         offset: 300,
//         tolerance: {
//             up: 30,
//             down: 30
//         },
//     });
//
//
//
// 	// Events
//
// 	if ($headroom.length) {
// 		headroom.init();
// 	}
//
// })();

//
// Navbar
//

'use strict';

var Navbar = (function() {

	// Variables

	var $nav = $('.navbar-nav, .navbar-nav .nav');
	var $collapse = $('.navbar .collapse');
	var $dropdown = $('.navbar .dropdown');

	// Methods

	function accordion($this) {
		$this.closest($nav).find($collapse).not($this).collapse('hide');
	}

    function closeDropdown($this) {
        var $dropdownMenu = $this.find('.dropdown-menu');

        $dropdownMenu.addClass('close');

    	setTimeout(function() {
    		$dropdownMenu.removeClass('close');
    	}, 200);
	}


	// Events

	$collapse.on({
		'show.bs.collapse': function() {
			accordion($(this));
		}
	})

	$dropdown.on({
		'hide.bs.dropdown': function() {
			closeDropdown($(this));
		}
	})

})();


//
// Navbar collapse
//


var NavbarCollapse = (function() {

	// Variables

	var $nav = $('.navbar-nav'),
		$collapse = $('.navbar .collapse');


	// Methods

	function hideNavbarCollapse($this) {
		$this.addClass('collapsing-out');
	}

	function hiddenNavbarCollapse($this) {
		$this.removeClass('collapsing-out');
	}


	// Events

	if ($collapse.length) {
		$collapse.on({
			'hide.bs.collapse': function() {
				hideNavbarCollapse($collapse);
			}
		})

		$collapse.on({
			'hidden.bs.collapse': function() {
				hiddenNavbarCollapse($collapse);
			}
		})
	}

})();

//
// Form control
//

'use strict';

var noUiSlider = (function() {

	// Variables

	// var $sliderContainer = $('.input-slider-container'),
	// 		$slider = $('.input-slider'),
	// 		$sliderId = $slider.attr('id'),
	// 		$sliderMinValue = $slider.data('range-value-min');
	// 		$sliderMaxValue = $slider.data('range-value-max');;


	// // Methods
	//
	// function init($this) {
	// 	$this.on('focus blur', function(e) {
  //       $this.parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
  //   }).trigger('blur');
	// }
	//
	//
	// // Events
	//
	// if ($input.length) {
	// 	init($input);
	// }



	if ($(".input-slider-container")[0]) {
			$('.input-slider-container').each(function() {

					var slider = $(this).find('.input-slider');
					var sliderId = slider.attr('id');
					var minValue = slider.data('range-value-min');
					var maxValue = slider.data('range-value-max');

					var sliderValue = $(this).find('.range-slider-value');
					var sliderValueId = sliderValue.attr('id');
					var startValue = sliderValue.data('range-value-low');

					var c = document.getElementById(sliderId),
							d = document.getElementById(sliderValueId);

					noUiSlider.create(c, {
							start: [parseInt(startValue)],
							connect: [true, false],
							//step: 1000,
							range: {
									'min': [parseInt(minValue)],
									'max': [parseInt(maxValue)]
							}
					});

					c.noUiSlider.on('update', function(a, b) {
							d.textContent = a[b];
					});
			})
	}

	if ($("#input-slider-range")[0]) {
			var c = document.getElementById("input-slider-range"),
					d = document.getElementById("input-slider-range-value-low"),
					e = document.getElementById("input-slider-range-value-high"),
					f = [d, e];

			noUiSlider.create(c, {
					start: [parseInt(d.getAttribute('data-range-value-low')), parseInt(e.getAttribute('data-range-value-high'))],
					connect: !0,
					range: {
							min: parseInt(c.getAttribute('data-range-value-min')),
							max: parseInt(c.getAttribute('data-range-value-max'))
					}
			}), c.noUiSlider.on("update", function(a, b) {
					f[b].textContent = a[b]
			})
	}

})();

//
// Popover
//

'use strict';

var Popover = (function() {

	// Variables

	var $popover = $('[data-toggle="popover"]'),
		$popoverClass = '';


	// Methods

	function init($this) {
		if ($this.data('color')) {
			$popoverClass = 'popover-' + $this.data('color');
		}

		var options = {
			trigger: 'focus',
			template: '<div class="popover ' + $popoverClass + '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
		};

		$this.popover(options);
	}


	// Events

	if ($popover.length) {
		$popover.each(function() {
			init($(this));
		});
	}

})();

//
// Scroll to (anchor links)
//

'use strict';

var ScrollTo = (function() {

	//
	// Variables
	//

	var $scrollTo = $('.scroll-me, [data-scroll-to], .toc-entry a');


	//
	// Methods
	//

	function scrollTo($this) {
		var $el = $this.attr('href');
        var offset = $this.data('scroll-to-offset') ? $this.data('scroll-to-offset') : 0;
		var options = {
			scrollTop: $($el).offset().top - offset
		};

        // Animate scroll to the selected section
        $('html, body').stop(true, true).animate(options, 600);

        event.preventDefault();
	}


	//
	// Events
	//

	if ($scrollTo.length) {
		$scrollTo.on('click', function(event) {
			scrollTo($(this));
		});
	}

})();

//
// Tooltip
//

'use strict';

var Tooltip = (function() {

	// Variables

	var $tooltip = $('[data-toggle="tooltip"]');


	// Methods

	function init() {
		$tooltip.tooltip();
	}


	// Events

	if ($tooltip.length) {
		init();
	}

})();

//
// Charts
//

'use strict';

var Charts = (function() {

	// Variable

	var $toggle = $('[data-toggle="chart"]');
	var mode = 'light';//(themeMode) ? themeMode : 'light';
	var fonts = {
		base: 'Open Sans'
	}

	// Colors
	var colors = {
		gray: {
			100: '#f6f9fc',
			200: '#e9ecef',
			300: '#dee2e6',
			400: '#ced4da',
			500: '#adb5bd',
			600: '#8898aa',
			700: '#525f7f',
			800: '#32325d',
			900: '#212529'
		},
		theme: {
			'default': '#172b4d',
			'primary': '#5e72e4',
			'secondary': '#f4f5f7',
			'info': '#11cdef',
			'success': '#2dce89',
			'danger': '#f5365c',
			'warning': '#fb6340'
		},
		black: '#12263F',
		white: '#FFFFFF',
		transparent: 'transparent',
	};

	var borderColors = [
		"rgba(155,159,201,1)",
		"rgba(87,194,146,1)",
		"rgba(214,112,170,1)",
		"rgba(92,183,208,1)",
		"rgba(202,223,119,1)",
		"rgba(245,209,116,1)",
		"rgba(200,100,100,1)",
		"rgba(100,200,100,1)",
		"rgba(100,100,200,1)"
	];

	function dynamicColors() {
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		return "rgb(" + r + "," + g + "," + b + ")";
	};

	// Methods

	// Chart.js global options
	function chartOptions() {

		// Options
		var options = {
			defaults: {
				global: {
					responsive: true,
					maintainAspectRatio: false,
					defaultColor: (mode == 'dark') ? colors.gray[700] : colors.gray[600],
					defaultFontColor: (mode == 'dark') ? colors.gray[700] : colors.gray[600],
					defaultFontFamily: fonts.base,
					defaultFontSize: 13,
					layout: {
						padding: 0
					},
					legend: {
						display: false,
						position: 'bottom',
						labels: {
							usePointStyle: true,
							padding: 16
						}
					},
					elements: {
						point: {
							radius: 0,
							backgroundColor: colors.theme['primary']
						},
						line: {
							tension: .4,
							borderWidth: 4,
							borderColor: colors.theme['primary'],
							backgroundColor: colors.transparent,
							borderCapStyle: 'rounded'
						},
						rectangle: {
							backgroundColor: colors.theme['warning']
						},
						arc: {
							backgroundColor: colors.theme['primary'],
							borderColor: (mode == 'dark') ? colors.gray[800] : colors.white,
							borderWidth: 4
						}
					},
					tooltips: {
						enabled: false,
						mode: 'index',
						intersect: false,
						custom: function(model) {

							// Get tooltip
							var $tooltip = $('#chart-tooltip');

							// Create tooltip on first render
							if (!$tooltip.length) {
								$tooltip = $('<div id="chart-tooltip" class="popover bs-popover-top" role="tooltip"></div>');

								// Append to body
								$('body').append($tooltip);
							}

							// Hide if no tooltip
							if (model.opacity === 0) {
								$tooltip.css('display', 'none');
								return;
							}

							function getBody(bodyItem) {
								return bodyItem.lines;
							}

							// Fill with content
							if (model.body) {
								var titleLines = model.title || [];
								var bodyLines = model.body.map(getBody);
								var html = '';

								// Add arrow
								html += '<div class="arrow"></div>';

								// Add header
								titleLines.forEach(function(title) {
									html += '<h3 class="popover-header text-center">' + title + '</h3>';
								});

								// Add body
								bodyLines.forEach(function(body, i) {
									if (body.length) {
										var colors = model.labelColors[i];
										var styles = 'background-color: ' + colors.backgroundColor;
										var indicator = '<span class="badge badge-dot"><i class="bg-primary"></i></span>';
										var align = (bodyLines.length > 1) ? 'justify-content-left' : 'justify-content-center';
										html += '<div class="popover-body d-flex align-items-center ' + align + '">' + indicator + body + '</div>';
									}
								});

								$tooltip.html(html);
							}

							// Get tooltip position
							var $canvas = $(this._chart.canvas);

							var canvasWidth = $canvas.outerWidth();
							var canvasHeight = $canvas.outerHeight();

							var canvasTop = $canvas.offset().top;
							var canvasLeft = $canvas.offset().left;

							var tooltipWidth = $tooltip.outerWidth();
							var tooltipHeight = $tooltip.outerHeight();

							var top = canvasTop + model.caretY - tooltipHeight - 16;
							var left = canvasLeft + model.caretX - tooltipWidth / 2;

							// Display tooltip
							$tooltip.css({
								'top': top + 'px',
								'left': left + 'px',
								'display': 'block',
								'z-index': '100'
							});

						},
						callbacks: {
							label: function(item, data) {
								var label = data.datasets[item.datasetIndex].label || '';
								var yLabel = item.yLabel;
								var content = '';

								if (data.datasets.length > 1) {
									content += '<span class="badge badge-primary mr-auto">' + label + '</span>';
								}

								content += '<span class="popover-body-value">' + yLabel + '</span>' ;
								return content;
							}
						}
					}
				},
				doughnut: {
					cutoutPercentage: 83,
					tooltips: {
						callbacks: {
							title: function(item, data) {
								var title = data.labels[item[0].index];
								return title;
							},
							label: function(item, data) {
								var value = data.datasets[0].data[item.index];
								var content = '';

								content += '<span class="popover-body-value">' + value + '</span>';
								return content;
							}
						}
					},
					legendCallback: function(chart) {
						var data = chart.data;
						var content = '';

						data.labels.forEach(function(label, index) {
							var bgColor = data.datasets[0].backgroundColor[index];

							content += '<span class="chart-legend-item">';
							content += '<i class="chart-legend-indicator" style="background-color: ' + bgColor + '"></i>';
							content += label;
							content += '</span>';
						});

						return content;
					}
				}
			}
		}

		// yAxes
		Chart.scaleService.updateScaleDefaults('linear', {
			gridLines: {
				borderDash: [2],
				borderDashOffset: [2],
				color: (mode == 'dark') ? colors.gray[900] : colors.gray[300],
				drawBorder: false,
				drawTicks: false,
				lineWidth: 0,
				zeroLineWidth: 0,
				zeroLineColor: (mode == 'dark') ? colors.gray[900] : colors.gray[300],
				zeroLineBorderDash: [2],
				zeroLineBorderDashOffset: [2]
			},
			ticks: {
				beginAtZero: true,
				padding: 10,
				callback: function(value) {
					if (!(value % 10)) {
						return value
					}
				}
			}
		});

		// xAxes
		Chart.scaleService.updateScaleDefaults('category', {
			gridLines: {
				drawBorder: false,
				drawOnChartArea: false,
				drawTicks: false
			},
			ticks: {
				padding: 20
			},
			maxBarThickness: 10
		});

		return options;

	}

	// Parse global options
	function parseOptions(parent, options) {
		for (var item in options) {
			if (typeof options[item] !== 'object' || Array.isArray(options[item])) {
				parent[item] = options[item];
			} else {
				parseOptions(parent[item], options[item]);
			}
		}
	}

	// Push options
	function pushOptions(parent, options) {
		for (var item in options) {
			if (Array.isArray(options[item])) {
				options[item].forEach(function(data) {
					parent[item].push(data);
				});
			} else {
				pushOptions(parent[item], options[item]);
			}
		}
	}

	// Pop options
	function popOptions(parent, options) {
		for (var item in options) {
			if (Array.isArray(options[item])) {
				options[item].forEach(function(data) {
					parent[item].pop();
				});
			} else {
				popOptions(parent[item], options[item]);
			}
		}
	}

	// Toggle options
	function toggleOptions(elem) {
		var options = elem.data('add');
		var $target = $(elem.data('target'));
		var $chart = $target.data('chart');

		if (elem.is(':checked')) {

			// Add options
			pushOptions($chart, options);

			// Update chart
			$chart.update();
		} else {

			// Remove options
			popOptions($chart, options);

			// Update chart
			$chart.update();
		}
	}

	// Update options
	function updateOptions(elem) {
		var options = elem.data('update');
		var $target = $(elem.data('target'));
		var $chart = $target.data('chart');

		// Parse options
		parseOptions($chart, options);
		if ($chart.data.datasets) {
			$chart.data.datasets = $chart.data.datasets.map(function(el) {
				var o = Object.assign({}, el);
				o.borderColor = dynamicColors();
				o.lineTension = 0;
				if ($chart.config.type === "groupableBar") {
					o.backgroundColor = o.borderColor;
					o.stack = 1;
				}
				return o;
			});
		}

		// Toggle ticks
		toggleTicks(elem, $chart);

		// Update chart
		$chart.update();
	}

	// Toggle ticks
	function toggleTicks(elem, $chart) {

		if (elem.data('prefix') !== undefined || elem.data('prefix') !== undefined) {
			var prefix = elem.data('prefix') ? elem.data('prefix') : '';
			var suffix = elem.data('suffix') ? elem.data('suffix') : '';

			// Update ticks
			$chart.options.scales.yAxes[0].ticks.callback = function(value) {
				if (!(value % 10)) {
					return prefix + value;
				}
			}

			// Update tooltips
			$chart.options.tooltips.callbacks.label = function(item, data) {
				var label = data.datasets[item.datasetIndex].label || '';
				var borderColor = data.datasets[item.datasetIndex].borderColor || '';
				var yLabel = item.yLabel;
				var content = '';
				var suffixExtraInfo = data.datasets[item.datasetIndex].suffixExtraInfo && data.datasets[item.datasetIndex].suffixExtraInfo[item.index] || '';

				if (data.datasets.length > 1) {
					// content += '<span class="popover-body-label mr-auto" style="color: ' + borderColor + '">' + label + '</span>';
					content += '<span class="popover-body-label mr-auto" style="color: white; background-color: ' + borderColor + '">' + label + '</span>';
				}

				content += '<span class="popover-body-value" style="margin-left: 5px">' + prefix + yLabel + ' ' + suffixExtraInfo + suffix + '</span>';
				return content;
			}

		}
	}


	// Events

	// Parse global options
	if (window.Chart) {
		parseOptions(Chart, chartOptions());
	}

	// Toggle options
	$toggle.on({
		'change': function() {
			var $this = $(this);

			if ($this.is('[data-add]')) {
				toggleOptions($this);
			}
		},
		'click': function() {
			var $this = $(this);

			if ($this.is('[data-update]')) {
				updateOptions($this);
			}
		}
	});


	// Return

	return {
		colors: colors,
		fonts: fonts,
		mode: mode
	};

})();

//
// Orders chart
//

var OrdersChart = (function() {

	//
	// Variables
	//

	var $chart = $('#chart-orders');
	var $ordersSelect = $('[name="ordersSelect"]');


	//
	// Methods
	//

	// Init chart
	function initChart($chart) {

		// Create chart
		var ordersChart = new Chart($chart, {
			type: 'bar',
			options: {
				scales: {
					yAxes: [{
						ticks: {
							callback: function(value) {
								if (!(value % 10)) {
									//return '$' + value + 'k'
									return value
								}
							}
						}
					}]
				},
				tooltips: {
					callbacks: {
						label: function(item, data) {
							var label = data.datasets[item.datasetIndex].label || '';
							var yLabel = item.yLabel;
							var content = '';

							if (data.datasets.length > 1) {
								content += '<span class="popover-body-label mr-auto">' + label + '</span>';
							}

							content += '<span class="popover-body-value">' + yLabel + '</span>';
							
							return content;
						}
					}
				}
			},
			data: {
				labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				datasets: [{
					label: 'Sales',
					data: [25, 20, 30, 22, 17, 29]
				}]
			}
		});

		// Save to jQuery object
		$chart.data('chart', ordersChart);
	}


	// Init chart
	if ($chart.length) {
		initChart($chart);
	}

})();

//
// Charts
//

'use strict';

//
// Sales chart
//

var SalesChart = (function() {

	// Variables

	var $chart = $('#chart-sales');
	var chartData = $chart.data('init') ? $chart.data('init').data : {};
	var prefix = $chart.data('prefix') ? $chart.data('prefix') : '';
	var suffix = $chart.data('suffix') ? $chart.data('suffix') : '';
	var title = ($chart.data('init') && $chart.data('init').options && $chart.data('init').options.title) ? $chart.data('init').options.title.text : '';

	var dynamicColors = function() {
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		return "rgb(" + r + "," + g + "," + b + ")";
	};

	if (chartData.datasets) {
		chartData.datasets = chartData.datasets.map(function(el) {
			var o = Object.assign({}, el);
			o.borderColor = dynamicColors();
			o.lineTension = 0;
			return o;
		});
	}

	// Methods
	function init($chart) {

		var salesChart = new Chart($chart, {
			type: 'line',
			options: {
				title: {
					display: true,
					text: title,
					fontSize: 18,
					fontColor: "#fff"
				},
				legend: {
					display: true,
					position: "bottom",
					labels: {
						fontColor: "#fff",
						fontSize: 16
					}
				},
				scales: {
					yAxes: [{
						// gridLines: {
						// 	color: Charts.colors.gray[900],
						// 	zeroLineColor: Charts.colors.gray[900]
						// },
						ticks: {
							callback: function(value) {
								if (!(value % 10)) {
									return prefix + value + suffix;
								}
							}
						}
					}]
				},
				tooltips: {
					callbacks: {
						label: function(item, data) {
							var label = data.datasets[item.datasetIndex].label || '';
							var borderColor = data.datasets[item.datasetIndex].borderColor || '';
							var yLabel = item.yLabel;
							var content = '';

							if (data.datasets.length > 1) {
								// content += '<span class="popover-body-label mr-auto" style="color: ' + borderColor + '">' + label + '</span>';
								content += '<span class="popover-body-label mr-auto" style="color: white; background-color: ' + borderColor + '">' + label + '</span>';
							}

							content += '<span class="popover-body-value" style="margin-left: 5px">' + prefix + yLabel + suffix + '</span>';
							return content;
						}
					}
				}
			},
			data: {
				labels: !$.isEmptyObject(chartData) ? chartData.labels : ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				datasets: !$.isEmptyObject(chartData) ? chartData.datasets : [{
					label: 'Performance',
					data: [0, 20, 10, 30, 15, 40, 20, 60, 60]
				}]
			}
		});

		// Save to jQuery object

		$chart.data('chart', salesChart);

	};


	// Events

	if ($chart.length) {
		init($chart);
	}

})();

Chart.defaults.groupableBar = Chart.helpers.clone(Chart.defaults.bar);

var helpers = Chart.helpers;
Chart.controllers.groupableBar = Chart.controllers.bar.extend({
  calculateBarX: function (index, datasetIndex) {
    // position the bars based on the stack index
    var stackIndex = this.getMeta().stackIndex;
    return Chart.controllers.bar.prototype.calculateBarX.apply(this, [index, stackIndex]);
  },

  hideOtherStacks: function (datasetIndex) {
    var meta = this.getMeta();
    var stackIndex = meta.stackIndex;

    this.hiddens = [];
    for (var i = 0; i < datasetIndex; i++) {
      var dsMeta = this.chart.getDatasetMeta(i);
      if (dsMeta.stackIndex !== stackIndex) {
        this.hiddens.push(dsMeta.hidden);
        dsMeta.hidden = true;
      }
    }
  },

  unhideOtherStacks: function (datasetIndex) {
    var meta = this.getMeta();
    var stackIndex = meta.stackIndex;

    for (var i = 0; i < datasetIndex; i++) {
      var dsMeta = this.chart.getDatasetMeta(i);
      if (dsMeta.stackIndex !== stackIndex) {
        dsMeta.hidden = this.hiddens.unshift();
      }
    }
  },

  calculateBarY: function (index, datasetIndex) {
    this.hideOtherStacks(datasetIndex);
    var barY = Chart.controllers.bar.prototype.calculateBarY.apply(this, [index, datasetIndex]);
    this.unhideOtherStacks(datasetIndex);
    return barY;
  },

  calculateBarBase: function (datasetIndex, index) {
    this.hideOtherStacks(datasetIndex);
    var barBase = Chart.controllers.bar.prototype.calculateBarBase.apply(this, [datasetIndex, index]);
    this.unhideOtherStacks(datasetIndex);
    return barBase;
  },

  getBarCount: function () {
    var stacks = [];

    // put the stack index in the dataset meta
    Chart.helpers.each(this.chart.data.datasets, function (dataset, datasetIndex) {
      var meta = this.chart.getDatasetMeta(datasetIndex);
      if (meta.bar && this.chart.isDatasetVisible(datasetIndex)) {
        var stackIndex = stacks.indexOf(dataset.stack);
        if (stackIndex === -1) {
          stackIndex = stacks.length;
          stacks.push(dataset.stack);
        }
        meta.stackIndex = stackIndex;
      }
    }, this);

    this.getMeta().stacks = stacks;
    return stacks.length;
  },
});

//
// GroupableBar chart
//

var GroupableBarCharts = (function() {

	//
	// Variables
	//

	var $chart = $('#chart-groupableBars');
	var chartData = $chart.data('init') ? $chart.data('init').data : {};
	var prefix = $chart.data('prefix') ? $chart.data('prefix') : '';
	var suffix = $chart.data('suffix') ? $chart.data('suffix') : '';
	var isShowZeroDataInTooltip = $chart.data('is-show-zero-data-in-tooltip') !== undefined ? $chart.data('is-show-zero-data-in-tooltip') : true;
	var title = ($chart.data('init') && $chart.data('init').options && $chart.data('init').options.title) ? $chart.data('init').options.title.text : '';

	var dynamicColors = function() {
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		return "rgb(" + r + "," + g + "," + b + ")";
	};

	if (!$.isEmptyObject(chartData) && chartData.datasets) {
		chartData.datasets = chartData.datasets.map(function(el) {
			var o = Object.assign({}, el);
			o.backgroundColor = dynamicColors();
			o.stack = 1;
			return o;
		});
	}

	//
	// Methods
	//

	// Init chart
	function initGroupableBarCharts($chart) {

		// Create chart
		var groupableBarChart = new Chart($chart, {
			type: 'groupableBar',
			options: {
				title: {
					display: true,
					text: title,
					fontSize: 18,
					fontColor: "#fff"
				},
				legend: {
					labels: {
						generateLabels: function(chart) {
							return Chart.defaults.global.legend.labels.generateLabels.apply(this, [chart]).filter(function(item, i){
								return i <= 2;
							});
						}
					}
				},
				scales: {
					yAxes: [{
						ticks: {
							callback: function(value) {
								if (!(value % 10)) {
									return prefix + value
								}
							}
						},
						stacked: true,
					}]
				},
				tooltips: {
					callbacks: {
						label: function(item, data) {
							if (isShowZeroDataInTooltip || (!isShowZeroDataInTooltip && item.yLabel !== 0)) {
								var label = data.datasets[item.datasetIndex].label || '';
								var backgroundColor = data.datasets[item.datasetIndex].backgroundColor || '';
								var yLabel = item.yLabel;
								var suffixExtraInfo = data.datasets[item.datasetIndex].suffixExtraInfo && data.datasets[item.datasetIndex].suffixExtraInfo[item.index] || '';
								var content = '';

								// if (data.datasets.length > 1) {
									content += '<span class="popover-body-label mr-auto" style="color: white; background-color: ' + backgroundColor + '">' + label + '</span>';
								// }

								content += '<span class="popover-body-value" style="margin-left: 5px">' + prefix + yLabel + ' ' + suffixExtraInfo + suffix + '</span>';

								return content;
							}
						}
					},
					custom: function(model) {

							// Get tooltip
							var $tooltip = $('#chart-tooltip');

							// Create tooltip on first render
							if (!$tooltip.length) {
								$tooltip = $('<div id="chart-tooltip" class="popover bs-popover-top" role="tooltip"></div>');

								// Append to body
								$('body').append($tooltip);
							}

							// Hide if no tooltip
							if (model.opacity === 0) {
								$tooltip.css('display', 'none');
								return;
							}

							function getBody(bodyItem) {
								return bodyItem.lines;
							}

							// Fill with content
							if (model.body) {
								var titleLines = model.title || [];
								var bodyLines = model.body.map(getBody);
								var keysPositive = [];
								var keysNegative = [];
								var bodyLinesPositive = [];
								var bodyLinesNegative = [];

								model.dataPoints.forEach((e, i) => {
									if (parseInt(e.yLabel) > 0) {
										keysPositive.push(i);
									} else if(parseInt(e.yLabel) < 0){
										keysNegative.push(i);
									}
								});

								keysPositive.forEach((e, i) => {
									var html = $.parseHTML(bodyLines[e][0]);
									var size = (20 - i) > 15 ? (20 - i) : 15;
									html[0].style.fontSize = size + "px";
									// html[1].style.fontSize = size + "px";
									bodyLines[e][0] = $('<div>').append(html).html();

									bodyLinesPositive.push(bodyLines[e]);
								});
								keysNegative.forEach((e, i) => {
									var html = $.parseHTML(bodyLines[e][0]);
									var size = (20 - i) > 15 ? (20 - i) : 15;
									html[0].style.fontSize = size + "px";
									// html[1].style.fontSize = size + "px";
									bodyLines[e][0] = $('<div>').append(html).html();

									bodyLinesNegative.push(bodyLines[e]);
								});
								bodyLinesPositive.reverse();
								if (bodyLinesPositive.length && bodyLinesNegative.length) {
									bodyLinesPositive.push({isBreakLine: true});
								}
								bodyLines = bodyLinesPositive.concat(bodyLinesNegative);
								var html = '';

								// Add arrow
								html += '<div class="arrow"></div>';

								// Add header
								titleLines.forEach(function(title) {
									html += '<h3 class="popover-header text-center">' + title + '</h3>';
								});

								// Add body
								bodyLines.forEach(function(body, i) {
									if (Array.isArray(body)) {
										if (body.length) {
											var indicator = '<span class="badge badge-dot"><i class="bg-primary"></i></span>';
											var align = (bodyLines.length > 1) ? 'justify-content-left' : 'justify-content-center';
											html += '<div class="popover-body d-flex align-items-center ' + align + '">' + indicator + body + '</div>';
										}
									} else {
										html += '<hr>';
									}
								});

								$tooltip.html(html);
							}

							// Get tooltip position
							var $canvas = $(this._chart.canvas);

							var canvasWidth = $canvas.outerWidth();
							var canvasHeight = $canvas.outerHeight();

							var canvasTop = $canvas.offset().top;
							var canvasLeft = $canvas.offset().left;

							var tooltipWidth = $tooltip.outerWidth();
							var tooltipHeight = $tooltip.outerHeight();

							var top = canvasTop + model.caretY - tooltipHeight - 16;
							var left = canvasLeft + model.caretX - tooltipWidth / 2;

							// Display tooltip
							$tooltip.css({
								'top': top + 'px',
								'left': left + 'px',
								'display': 'block',
								'z-index': '100'
							});

						},
				}
			},
			data: {
				labels: !$.isEmptyObject(chartData) ? chartData.labels : [],
				datasets: !$.isEmptyObject(chartData) ? chartData.datasets : [{}]
				// labels: ["9/30", "10/01"],
				// datasets: [
				// 	{
				// 		label: "10/05",
				// 		backgroundColor: "rgb(99,255,132)",
				// 		data: [0,30000],
				// 		suffixExtraInfo: [0,3],
				// 		stack: 1
				// 	},
				// 	{
				// 		label: "10/06",
				// 		backgroundColor: "rgb(255,99,132)",
				// 		data: [40000,-10000],
				// 		suffixExtraInfo: [4,1],
				// 		stack: 1
				// 	},
				// 	{
				// 		label: "10/07",
				// 		backgroundColor: "rgb(25,99,132)",
				// 		data: [40000,50000],
				// 		suffixExtraInfo: [4,5],
				// 		stack: 1
				// 	},
				// ]
			}
		});

		// Save to jQuery object
		$chart.data('chart', groupableBarChart);
	}


	// Init chart
	if ($chart.length) {
		initGroupableBarCharts($chart);
	}

})();