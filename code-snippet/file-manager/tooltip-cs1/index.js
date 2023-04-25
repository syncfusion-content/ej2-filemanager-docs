var hostUrl = 'https://ej2-aspcore-service.azurewebsites.net/';
// inject feature modules of the file manager
ej.filemanager.FileManager.Inject(ej.filemanager.DetailsView,ej.filemanager.Toolbar,ej.filemanager.NavigationPane);
// initialize File Manager component
var fileObj = new ej.filemanager.FileManager({
ajaxSettings: {
        url: hostUrl + 'api/FileManager/FileOperations',
        uploadUrl: hostUrl + 'api/FileManager/Upload',
        downloadUrl: hostUrl + 'api/FileManager/Download',
        getImageUrl: hostUrl + 'api/FileManager/GetImage'
},
created: function () { addTooltip(); },
fileLoad: function (args) {
    //Native tooltip customization to display additonal information in new line
    var target = args.element;
    if (args.module === 'DetailsView') {
        var ele = select('[title]', args.element);
         var title =  args.fileDetails.name +
        '\n' +  args.fileDetails.dateModified;
        ele.setAttribute('title', title);
    }
    else if (args.module === 'LargeIconsView') {
        var title =  args.fileDetails.name +
        '\n' +  args.fileDetails.dateModified;
        target.setAttribute('title', title);
    }
}
});

// render initialized File Manager
fileObj.appendTo('#filemanager');

function addTooltip() {
    var tooltip = new ej.popups.Tooltip({
        target: '#' + fileObj.element.id + '_toolbar [title]',
        beforeRender: onTooltipBeforeRender  
    });
    tooltip.appendTo('#' + fileObj.element.id + '_toolbar');
}
function onTooltipBeforeRender(args) {
    var buttonId = args.target.children[0].id;
    var description = '';
    switch (buttonId) {
        case fileObj.element.id + '_tb_newfolder':
            description = 'Create a new folder';
            break;
        case fileObj.element.id + '_tb_upload':
            description = 'Upload new files';
            break;
        case fileObj.element.id + '_tb_cut':
            description = 'Cut files and folders from the current location';
            break;
        case fileObj.element.id + '_tb_copy':
            description = 'Copy files and folders from the current location';
            break;
        case fileObj.element.id + '_tb_paste':
            description = 'Paste files and folders in the current location';
            break;
        case fileObj.element.id + '_tb_delete':
            description = 'Delete selected files and folders';
            break;
        case fileObj.element.id + '_tb_download':
            description = 'Download selected files and folders';
            break;
        case fileObj.element.id + '_tb_rename':
            description = 'Rename selected file or folder';
            break;
        case fileObj.element.id + '_tb_sortby':
            description = 'Change the file sorting order';
            break;
        case fileObj.element.id + '_tb_refresh':
            description = 'Refresh the current location';
            break;
        case fileObj.element.id + '_tb_selection':
            description = 'Following items are currently selected:';
            for (var i = 0; i < fileObj.selectedItems.length; i++) {
                description = description + '</br>' + fileObj.selectedItems[i];
            }
            break;
        case fileObj.element.id + '_tb_view':
            description = 'Switch the layout view';
            break;
        case fileObj.element.id + '_tb_details':
            description = 'Get the details of the seletced items';
            break;
        default:
            description = '';
            break;
    }
    this.content = args.target.getAttribute('title') + '</br>' + description;
}


