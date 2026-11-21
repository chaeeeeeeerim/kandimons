document.addEventListener("DOMContentLoaded", function() {
  // sliders
  const item_slider_breakpoints = {1070: {spaceBetween: 12, slidesPerView: 7, slidesPerGroup: 7}, 870: {spaceBetween: 12, slidesPerView: 6, slidesPerGroup: 6}, 620: {spaceBetween: 12, slidesPerView: 5, slidesPerGroup: 5}, 430: {spaceBetween: 10, slidesPerView: 4, slidesPerGroup: 4}, 0: {spaceBetween: 10, slidesPerView: 3, slidesPerGroup: 3}};
  const article_slider_breakpoints = {1070: {spaceBetween: 12, slidesPerView: 4, slidesPerGroup: 4}, 780: {spaceBetween: 12, slidesPerView: 3, slidesPerGroup: 3}, 480: {spaceBetween: 12, slidesPerView: 2, slidesPerGroup: 2}, 0: {spaceBetween: 12, slidesPerView: 1, slidesPerGroup: 1}};

  function init_swiper_when_visible(slider_selector, swiper_config) {
    const slider_el = document.querySelector(slider_selector);
    if (!slider_el) return;

    let initialized = false;

    function init_swiper() {
      if (initialized) return;
      initialized = true;
      new Swiper(slider_selector, swiper_config);

      if (typeof lazyload === "function") {
        lazyload();
      }
    }

    if (!('IntersectionObserver' in window)) {
      init_swiper();
      return;
    }

    const observer = new IntersectionObserver(function(entries) {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      init_swiper();
    }, {rootMargin: '500px 0px'});

    observer.observe(slider_el);
  }

  init_swiper_when_visible('#latest_roblox_limiteds_slider', {direction: 'horizontal', threshold: 2, lazy: false, paginationClickable: true, navigation: {nextEl: '.latest-roblox-limiteds-slider-button-next', prevEl: '.latest-roblox-limiteds-slider-button-prev'}, breakpoints: item_slider_breakpoints});
  init_swiper_when_visible('#latest_ugc_limiteds_slider', {direction: 'horizontal', threshold: 2, lazy: false, paginationClickable: true, navigation: {nextEl: '.latest-ugc-limiteds-slider-button-next', prevEl: '.latest-ugc-limiteds-slider-button-prev'}, breakpoints: item_slider_breakpoints});
  init_swiper_when_visible('#latest_ugc_emotes_slider', {direction: 'horizontal', threshold: 2, lazy: false, paginationClickable: true, navigation: {nextEl: '.latest-ugc-emotes-slider-button-next', prevEl: '.latest-ugc-emotes-slider-button-prev'}, breakpoints: item_slider_breakpoints});
  init_swiper_when_visible('#latest_ugc_items_slider', {direction: 'horizontal', threshold: 2, lazy: false, paginationClickable: true, navigation: {nextEl: '.latest-ugc-items-slider-button-next', prevEl: '.latest-ugc-items-slider-button-prev'}, breakpoints: item_slider_breakpoints});
  init_swiper_when_visible('#latest_roblox_items_slider', {direction: 'horizontal', threshold: 2, lazy: false, paginationClickable: true, navigation: {nextEl: '.latest-roblox-items-slider-button-next', prevEl: '.latest-roblox-items-slider-button-prev'}, breakpoints: item_slider_breakpoints});
  init_swiper_when_visible('#featured_articles_slider', {direction: 'horizontal', threshold: 2, lazy: false, paginationClickable: true, navigation: {nextEl: '.featured-articles-slider-button-next', prevEl: '.featured-articles-slider-button-prev'}, breakpoints: article_slider_breakpoints});

  // lazy-init bs4 tooltips and lazyload images
  $(document).on('mouseenter focus', '[data-toggle="tooltip"]', function() {
    const $this = $(this);
    if ($this.data('bs.tooltip')) return;
    $this.tooltip({container: 'body', html: $this.attr('data-html') === 'true'});
    $this.tooltip('show');
  });

  if (typeof lazyload === "function") {
    lazyload();
  }
});

// update countdown element if needed
const event_ts = 1785002400;
const current_ts = 1795217726;

if (current_ts < event_ts) {
  const event_countdown_args = [event_ts, 'event-countdown-days', 'event-countdown-hours', 'event-countdown-minutes', 'event-countdown-seconds'];
  const countdown_element_days = document.getElementById('event-countdown-days');
  if (countdown_element_days && update_countdown_elements.apply(null, event_countdown_args)) {
    const event_countdown_timer = setInterval(function() {
      if (document.hidden) return;

      const still_active = update_countdown_elements.apply(null, event_countdown_args);
      if (!still_active) {
        clearInterval(event_countdown_timer);
      }
    }, 1000);
  }
}

function update_countdown_elements(ts, days_element, hours_element, minutes_element, seconds_element) {
  const ts_date = new Date(ts * 1000);
  const countdown_data = end_date_to_countdown_data(ts_date);
  if (countdown_data.remaining_seconds < 0) return false;
  document.getElementById(days_element).textContent = countdown_data.days;
  document.getElementById(hours_element).textContent = countdown_data.hours;
  document.getElementById(minutes_element).textContent = countdown_data.minutes;
  document.getElementById(seconds_element).textContent = countdown_data.seconds;
  return true;
}

function end_date_to_countdown_data(end_date) {
  const now = new Date();
  const remaining_seconds = Math.floor((end_date - now) / 1000);
  const days = Math.floor(remaining_seconds / (3600 * 24));
  const hours = Math.floor((remaining_seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((remaining_seconds % 3600) / 60);
  const seconds = Math.floor(remaining_seconds % 60);
  const countdown_data = {remaining_seconds: remaining_seconds, days: `${days}`, hours: `${hours}`, minutes: `${minutes}`, seconds: `${seconds}`};
  return countdown_data;
}