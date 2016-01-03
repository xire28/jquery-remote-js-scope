# Jquery remote js scope
Provide a simple way to pass variables to a remote js response

## Requirements

- JQuery 1.8.x or higher

## Install
### Using Bower

```
bower install jquery-remote-js-scope --save
```

### Using Bundler

```
source 'https://rails-assets.org' do
	gem 'rails-assets-jquery-remote-js-scope'
end
```

## Usage

1. The request must have the `global` option set to `true` (default)

2. Add a scope options to the request
```
$.ajax({
	url: 'info',
	scope: {uploadRequest: request},
	...
})
```

- The plugin will automatically add a new parameter to the request `ajax_request_id`

## Access the scope from the remote js response (js.erb)
```
(function($){
	var fileInfoNodes = $('<%= escape_javascript(render partial: 'file_info', collection: file_infos, as: :file_info) %>'),
		ajaxRequestID = '<%= escape_javascript(ajax_request_id) %>',
		scope = $.requests[ajaxRequestID]

	scope.uploadRequest.progress(function(e){
		var percentage = (e.loaded / e.total) * 100

		//Update all progressbar values
		fileInfoNodes.find('progress').val(percentage)
	})

	fileInfoNodes.appendTo('#files')

	//Don't forget to delete the request scope (manual garbage collection)
	delete $.requests[ajaxRequestID]
})(jQuery)
```