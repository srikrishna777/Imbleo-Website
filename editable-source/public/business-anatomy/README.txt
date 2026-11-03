IMBLEO — BUSINESS ANATOMY

Ready-to-host static website. No build step or backend is required.

UPLOAD
Extract this ZIP and upload all its contents together. index.html must sit beside app.js and the _next folder. You may place the files at the site root or in a folder such as /imbleo/. Keep the _next folder name unchanged.

EMBED IN ANOTHER WEBSITE
After uploading the files into /imbleo/, paste this into the other page:

<iframe src="/imbleo/" title="Imbleo — Business Anatomy" style="width:100%;height:900px;border:0" loading="lazy" allowfullscreen></iframe>

Change the iframe URL to the actual location of the uploaded website. If the site is hosted on another domain, use its full HTTPS URL. Your website builder must allow custom HTML/iframes.

LOCAL PREVIEW
Serve this folder through an HTTP server, for example:
python3 -m http.server 8000
Then open http://localhost:8000 in a browser. Opening index.html directly through file:// can block JavaScript modules.

The package includes the interactive Guided and Explore views, anatomy layers, presenter notes, and department details.
