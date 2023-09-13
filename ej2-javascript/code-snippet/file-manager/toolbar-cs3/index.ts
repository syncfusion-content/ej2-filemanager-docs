

import { FileManager, Toolbar, NavigationPane, DetailsView, ToolbarClickEventArgs } from '@syncfusion/ej2-filemanager';

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
    toolbarSettings:{items: ['NewFolder', 'Custom', 'Upload', 'Delete', 'Download', 'Rename', 'SortBy', 'Refresh', 'Selection', 'View', 'Details']},
    toolbarClick:toolbarClick
});

// event for custom toolbar item
function toolbarClick(args: ToolbarClickEventArgs) {
    if (args.item.text === 'Custom') {
        alert('You have clicked custom toolbar item')
    }
}

// render initialized FileManager
filemanagerInstance.appendTo('#filemanager');