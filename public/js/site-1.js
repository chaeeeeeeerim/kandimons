const svg_navbar_account = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="-ms-transform:rotate(360deg);-webkit-transform:rotate(360deg)" viewBox="0 0 24 24" transform="rotate(360)"><path d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" fill="currentColor"/></svg>';
var jwt_player_name = null;
var jwt_player_id = null;

function decode_jwt(token) {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    const token_b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const token_json = decodeURIComponent(atob(token_b64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(token_json);
  }
  catch (error) {return null;}
}

function update_navbar_with_player_info() {
  const c_name = '_RoliData';
  const c_string = `; ${document.cookie}`;
  const c_parts = c_string.split(`; ${c_name}=`);
  if (c_parts.length !== 2) return;
  const c_value = c_parts.pop().split(';').shift();
  if (typeof c_value !== 'string') return;

  const jwt_player_data = decode_jwt(c_value);
  if (!jwt_player_data) return;
  if (!jwt_player_data.player_data) return;
  jwt_player_name = jwt_player_data.player_data.name;
  if (typeof jwt_player_name !== 'string') {jwt_player_name = null; return;}
  if (!/^[0-9A-Za-z _\(\)\[\]]*$/.test(jwt_player_name)) {jwt_player_name = null; return;}
  jwt_player_id = jwt_player_data.player_data.id;
  if (!Number.isInteger(jwt_player_id) || jwt_player_id < 1) {jwt_player_id = null; return;}
  const menu_pfp = document.getElementById('navbar_player_menu_pfp');
  const menu_name = document.getElementById('navbar_player_menu_player_name');
  if (menu_pfp) menu_pfp.innerHTML = `<img class="navbar_player_menu_pfp_img" src="/images/transparent-square-110.png" data-fetch-player-avatar-bust-sm="${jwt_player_id}" height="33.75" width="33.75" alt="Player Thumbnail"/>`;
  if (menu_name) menu_name.textContent = jwt_player_name;
}

function update_player_navbar_menu() {
  if (jwt_player_name !== null && jwt_player_id !== null) {
  //-if (true) {
    document.getElementById('navbar_player_menu_verify').classList.add('d-none');
    document.getElementById('navbar_player_menu_logout').classList.remove('d-none');
    document.getElementById('navbar_player_menu_logout_divider').classList.remove('d-none');
    document.getElementById('navbar_player_menu_profile').classList.remove('d-none');
    document.getElementById('navbar_player_menu_profile').setAttribute('href', `/player/${jwt_player_id}`);
    document.getElementById('navbar_player_menu_create_trade_ad').classList.remove('d-none');
    document.getElementById('navbar_player_menu_create_trade_ad').setAttribute('href', '/tradeadcreate');
    document.getElementById('navbar_player_menu_my_trade_ads').classList.remove('d-none');
    document.getElementById('navbar_player_menu_my_trade_ads').setAttribute('href', `/playertrades/${jwt_player_id}`);
    document.getElementById('navbar_player_menu_trade_settings').classList.remove('d-none');
    document.getElementById('navbar_player_menu_trade_settings').setAttribute('href', '/tradesettings');
    //-document.getElementById('navbar_player_menu_my_subscriptions').classList.remove('d-none');
    //-document.getElementById('navbar_player_menu_my_subscriptions').setAttribute('href', '/my-subscriptions');
  }
  else {
    document.getElementById('navbar_player_menu_logout_divider').classList.add('d-none');
    document.getElementById('navbar_player_menu_pfp').innerHTML = svg_navbar_account;
    document.getElementById('navbar_player_menu_create_trade_ad').classList.add('d-none');
    document.getElementById('navbar_player_menu_my_trade_ads').classList.add('d-none');
    document.getElementById('navbar_player_menu_trade_settings').classList.add('d-none');
    //-document.getElementById('navbar_player_menu_my_subscriptions').classList.add('d-none');
  }
}

update_navbar_with_player_info();
update_player_navbar_menu();

document.addEventListener("DOMContentLoaded", function(event) {
  update_player_thumbnails();
  document.getElementById("navbar_player_menu_logout").addEventListener("click", function() {
    Swal.fire({title:'Are you sure?', type:'warning', showCancelButton:true, background:'#22282b', confirmButtonColor:'#e1689f', confirmButtonText:'Yes, logout!', cancelButtonColor:'#d33', html:'<span style="color: #ddd;">If you log out you will need to verify again to use certain features like trade ads.</span>'})
    .then(function(result) {
      if (result.value) {
        fetch('/api/auth/v1/logout', {method:'POST', headers:{'Content-Type':'application/json'}, credentials:'include', body: null})
        .then(response => {
          if (!response.ok) {console.warn('Logout failed, response error'); return;}
          return response.json();
        })
        .then(data => {
          if (!data) {console.warn('Logout failed, missing response data'); return;}
          if (data.success == true) {
            jwt_player_name = null;
            jwt_player_id = null;
            document.getElementById('navbar_player_menu_pfp').innerHTML=svg_navbar_account;
            document.getElementById('navbar_player_menu_player_name').textContent='Account';
            document.getElementById('navbar_player_menu_verify').classList.remove('d-none');
            document.getElementById('navbar_player_menu_logout').classList.add('d-none');
            document.getElementById('navbar_player_menu_logout_divider').classList.add('d-none');
            document.getElementById('navbar_player_menu_profile').classList.add('d-none');
            document.getElementById('navbar_player_menu_create_trade_ad').classList.add('d-none');
            document.getElementById('navbar_player_menu_my_trade_ads').classList.add('d-none');
            document.getElementById('navbar_player_menu_trade_settings').classList.add('d-none');
            //-document.getElementById('navbar_player_menu_my_subscriptions').classList.add('d-none');
          }
          else {console.warn('Logout failed, potential server error');}
        })
        .catch(error => {
          console.warn('Logout failed: Network error or bad json data');
        });
      }
    });
  });
});