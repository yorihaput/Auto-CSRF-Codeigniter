# Auto-CSRF-Codeigniter
Automatic add CSRF hash to Form Submission or Ajax Request for Codeigniter.

This library use for Codeigniter CSRF Security. You dont need pass token to every response because it set from CSRF Cookie. Dont forget to set this code in file application/config/config.php
```php
$config["csrf_regenerate"] = true
```
# This script only work on http network because cookie set on httpOnly you can disable it on config.php $config['cookie_httponly']. This script use document.cookie to read stored csrf hash on cookie if you have better method you can share this.

## Setup
You need create a variable on <head> tag before load this library.
```html
<html>
  <head>
    ....
    <script src="path/to/jquery.js" />
    <script type="text/javascript">
      var csrf_name = '<?php echo $this->security->get_csrf_token_name(); ?>';
    </script>
    <script src="path/to/auto-csrf.min.js" />
    ....
  </head>
  <body>
    ....
  </body>
</html>
```
  
