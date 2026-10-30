export default {
  async fetch(request) {
    const url = new URL(request.url);
    let targetUrl = '';

    if (url.pathname.startsWith('/image')) {
      targetUrl = 'https://image.tmdb.org' + url.pathname.replace('/image', '') + url.search;
    } else {
      targetUrl = 'https://api.themoviedb.org' + url.pathname + url.search;
    }

    try {
      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
      });

      const newHeaders = new Headers(response.headers);
      
      // CORS headers add kar rahe hain taaki localhost ya live domain par error na aaye
      newHeaders.set('Access-Control-Allow-Origin', '*');
      newHeaders.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST');
      newHeaders.set('Access-Control-Allow-Headers', '*');

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });
    } catch (err) {
      return new Response('Proxy Error: ' + err.message, { status: 500 });
    }
  }
};
