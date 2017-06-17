(function () {
	var SuperEditor = function(){

        var view, fileName, isDirty = false,
        unsaveMsg = 'Unsaved changes will be lost. Are you sure?',
        UnsavedTitle = 'Discard changes';

        var markDirty = function(){
        	isDirty = true;
        };

        var	markClean = function(){
        	isDirty = false;
        };

        var checkDirty = function(){
        	if (isDirty) { return unsaveMsg;}
        };

        window.addEventListener('beforeunload',checkDirty,false);

        var jump = function(e){
             var hash = location.hash;

             if (hash.indexOf('/') > -1) {
             	 var parts = hash.split('/')
             	     fileNameEl = document.getElementById('file_name');

             	 view = parts[0].substring[1] + '-view' ;
             	 fileName = parts[1]
             	 fileNameEl.innerHTML  = fileName;  
             }   else {
             	if (!isDirty || confirm (unsaveMsg,UnsavedTitle)) {
             		markClean();
             		view = 'browser-view';
             		if (hash != '#list ') {
             			  location.hash = '#list';
             		}
                   
             	}else{
             		location.href = e.oldURL;
             	}

             }
             document.body.className = view;
        };

        jump();

        window.addEventListener('hashchange' , jump ,false);

        var editVisualButton = document.getElementById('edit_visual'),
            visualView = document.getElementById('file_contents_visual'),
            visualEditor = document.getElementById('file_contents_visual_editor'),
            visualEditorDoc = visualEditor.conetentDocument,
            editHtmlButton = document.getElementById('edit_html'),
            htmlView = document.getElementById('file_contents_html'),
            htmlEditor = document.getElementById('file_contents_html_editor');

            visualEditorDoc.disignMode = 'on';

            visualEditorDoc.addEventListener('keyup' ,markDirty,false);
            htmlEditor.addEventListener('keyup' ,markDirty,false);

            var updateVisualEditor = function(content){
            	visualEditorDoc.open();
            	visualEditorDoc.write(content);
            	visualEditorDoc.close();
            	visualEditorDoc.addEventListener('keyup' ,markDirty,false);
            };

            var updateHtmlEditor = function(content){
            	htmlEditor.value =content;
            };

            var toggleActiveView = function(){
            	if (htmlView.style.display == 'block') {
            		editVisualButton.className = 'split_left actvie';
            		visualView.style.display = 'block';
            		editHtmlButton.className = 'split_right';
            		htmlView.style.display = 'none';
            		updateVisualEditor(htmlEditor.value);
            	} else{
            		editHtmlButton.className = 'split_right actvie'
            		htmlView.style.display = 'block';
            		editVisualButton.className = 'split_left';
            		visualView.style.display = 'none';

            		var x = new XMLSerializer();
            		var content = x.serializeToString(visualEditorDoc);
            		updateHtmlEditor(content);

            	}
            }
            editVisualButton.addEventListener('click',toggleActiveView,false);
            editHtmlButton.addEventListener('click', toggleActiveView,false);
	}


	var init = function () {
		new SuperEditor();
	}

	window.addEventListener('load',init ,false);
}) ();