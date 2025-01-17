var listSettingAdultRoom = {};
var Custom = (function() {
  $('.' + 'hotel_id-' + $('select.crawl-results-hotel-id').val()).show( "fast" );
  $('select.crawl-results-hotel-id').change(function() {
    $('select.crawl-results-hotel-room-type-id option').hide();
    $('.' + 'hotel_id-' + $(this).val()).show( "fast" );
    $('select.crawl-results-hotel-room-type-id').val($('.' + 'hotel_id-' + $(this).val()).first().val());
  });

  $('#list-crawl-condition-crawl-target-days input').each(function() {
    if ($(this).val()) {
      var id = $(this).attr('id').split('crawl-condition-crawl-target-days')[1];
      var arr = id.split('-');
      var object = {
        'stay_adults': parseInt(arr[0]) + 1,
        'stay_rooms': parseInt(arr[1]) + 1,
        'stay_days': 1,
        'stay_children': 0
      };
      listSettingAdultRoom[id] = object;
      $('#input-list-setting-adult-room').val(JSON.stringify(listSettingAdultRoom));
    }
  });

  $('.crawl-condition-checkbox').click(function() {
      var id = $(this).attr('id').split('crawl-condition-checkbox')[1];
      if( $(this).is(':checked')) {
        $('#' + 'crawl-condition-crawl-target-days' + id).prop('disabled', false);
        var arr = id.split('-');
        var object = {
          'stay_adults': parseInt(arr[0]) + 1,
          'stay_rooms': parseInt(arr[1]) + 1,
          'stay_days': 1,
          'stay_children': 0
        };
        listSettingAdultRoom[id] = object;
        $('#input-list-setting-adult-room').val(JSON.stringify(listSettingAdultRoom));
      } else {
        $('#' + 'crawl-condition-crawl-target-days' + id).prop('disabled', true);
        // $('#' + 'crawl-condition-crawl-target-days' + id).val('');
        delete listSettingAdultRoom[id];
        $('#input-list-setting-adult-room').val(JSON.stringify(listSettingAdultRoom));
      }
  });
})();

var ChartCrawlResults = (function() {
  var $toggle = $('[data-toggle="chart"]');

  $toggle.on({
    'click': function() {
      var $this = $(this);
      if ($this.attr('id') !== 'undefined' && $this.attr('id').includes('crawl-results-chart')) {
        $('#crawl-results-chart-type').val($this.attr('id'));
        if ($this.attr('id') === 'crawl-results-chart2') {
          $("input[id^='customRadio']").each(function (i, el) {
            this.checked = false;
          });
          $('#plan-radio-button').show();
        } else {
          $('#plan-radio-button').hide();
        }
      }
    }
  });

  $("#btnZoomInCrawlResultChart").click(function () {
    $('#crawl-results-chart').css( "height", "+=100px" );
  });

  $("#btnZoomOutCrawlResultChart").click(function () {
    $('#crawl-results-chart').css( "height", "-=100px" );
  });
})();