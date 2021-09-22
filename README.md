# Auto-CSRF-Codeigniter
Automatic add CSRF hash to Form Submission or Ajax Request for Codeigniter.

This library use for Codeigniter CSRF Security. You dont need pass token to every response because it set from stored local storage. Dont forget to set this code in file application/config/config.php
```php
$config["csrf_regenerate"] = true
```

## Setup
You need create a variable on <head> tag before load this library.
```html
<html>
  <head>
    ....
    <script src="path/to/jquery.js" />
    <script type="text/javascript">
      var csrf_name = '<?php echo $this->security->get_csrf_token_name(); ?>';
      var csrf_value = '<?php echo $this->security->get_csrf_hash(); ?>';
    </script>
    <script src="path/to/auto-csrf.min.js" />
    ....
  </head>
  <body>
    ....
  </body>
</html>
```
  
