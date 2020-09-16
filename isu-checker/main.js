require('dotenv').config({ path: __dirname + '/./../.env' })

const axios = require('axios');
const telegram = require('../telegram/telegram');


(async function () {
  try {
    const resp = await axios.post('https://isu.ifmo.ru/pls/apex/wwv_flow.show', {
      headers: {
        Cookie: 'REMEMBER_ME=33481BBBE00F757995BA150BF98D2023:311C09E75B743DE788973F8142310902; CUSTOM_COOKIE=21.04.2020 16:11:06; ISU_AP_COOKIE=ORA_WWV-g71J8PjDXs72WYT21Mc0RHPn; _ym_uid=1587041787551562842; _ym_d=1587041787; ISU_LIB_SID=ORA_WWV-g71J8PjDXs72WYT21Mc0RHPn',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': 'https://isu.ifmo.ru/pls/apex/f?p=2153:15:100288666428358::NO:RP,3::',
        Origin: 'https://isu.ifmo.ru'        
      },
      data: {
        p_request:	"APPLICATION_PROCESS=get_class_info",
        p_flow_id:	"2153",
        p_flow_step_id:	"15",
        p_instance:	"100288666428358",
        p_debug:	"",
        x01:	"5565",
        x02:	"ru"
      }
    });

    console.log('ФИЗ-РА ТОП', resp.data);
  } catch (err) {
    console.log('Error', err.response.status, err.response.statusText);
  }
  
})();
// telegram.sendMessage('Физра это <b>смерть</b>');