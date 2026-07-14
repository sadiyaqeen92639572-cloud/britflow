
(function () {
    var scripts = document.getElementsByTagName('script');
    var myScript = scripts[scripts.length - 1];
    var toolId = myScript.getAttribute('data-tool');
    var baseUrl = myScript.src.replace('/embed-v1.js', '');

    var container = document.getElementById('bf-widget-' + toolId);
    if (!container) return;

    // Create iframe
    var iframe = document.createElement('iframe');
    iframe.src = baseUrl + '/#embed/' + toolId;
    iframe.style.width = '100%';
    iframe.style.height = '600px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '24px';
    iframe.style.overflow = 'hidden';

    container.appendChild(iframe);

    // Communication for height adjustment
    window.addEventListener('message', function (e) {
        if (e.data && e.data.type === 'bf-height' && e.data.tool === toolId) {
            iframe.style.height = e.data.height + 'px';
        }
    }, false);
})();
