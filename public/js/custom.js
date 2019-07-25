var listSettingAdultRoom = {};
var Custom = (function() {
  $('.crawl-condition-checkbox').click(function() {
      var id = $(this).attr('id').split('crawl-condition-checkbox')[1];
      if( $(this).is(':checked')) {
        $('#' + 'crawl-condition-crawl-target-days' + id).prop('disabled', false);
        var arr = id.split('');
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
        delete listSettingAdultRoom[id];
        $('#input-list-setting-adult-room').val(JSON.stringify(listSettingAdultRoom));
      }
  }); 
})();