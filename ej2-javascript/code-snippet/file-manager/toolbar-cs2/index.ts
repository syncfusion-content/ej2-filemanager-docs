

import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

FileManager.Inject(Toolbar, NavigationPane, DetailsView)

let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
// initialize File Manager component
let filemanagerInstance: FileManager = new FileManager({
    ajaxSettings: {
        url: hostUrl + 'api/FileManager/FileOperations',
        getImageUrl: hostUrl + 'api/FileManager/GetImage',
        uploadUrl: hostUrl + 'api/FileManager/Upload',
        downloadUrl: hostUrl + 'api/FileManager/Download'
    },
    //Custom item added along with default item
    toolbarItems: [{ name: 'NewFolder' }, 
    { name: 'Upload' },   
    { name: 'SortBy' },
    { name: 'Refresh' },
    { name: 'Cut' },
    { name: 'Copy' },
    { name: 'Paste' },
    { name: 'Delete' },
    { name: 'Download' },
    { name: 'Rename' },
    { template: '<input id="checkbox" type="checkbox"/>', name: 'Select' },
    { name: 'Selection' },
    { name: 'View' },
    { name: 'Details' }]
});

// render initialized FileManager
filemanagerInstance.appendTo('#filemanager');

// Render Checkbox in template
var checkbox: CheckBox = new CheckBox({ label: 'Select All', checked: false, change: onChange },'#checkbox');

// on checkbox change select all or clear selection
function onChange(args: ChangeEventArgs): void {
    if (args.checked) {
        filemanagerInstance.selectAll(); 
        checkbox.label = 'Unselect All';
    }
    else {
        filemanagerInstance.clearSelection();
        checkbox.label = 'Select All';
    }
}
