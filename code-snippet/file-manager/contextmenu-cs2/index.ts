

import { FileManager, Toolbar, NavigationPane, DetailsView, MenuClickEventArgs, MenuOpenEventArgs } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView)

let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
// initialize File Manager component and add custom item to contextmenu
let filemanagerInstance: FileManager = new FileManager({
    ajaxSettings: {
        url: hostUrl + 'api/FileManager/FileOperations',
        getImageUrl: hostUrl + 'api/FileManager/GetImage',
        uploadUrl: hostUrl + 'api/FileManager/Upload',
        downloadUrl: hostUrl + 'api/FileManager/Download'
    },
    // Custom menu item added to context menu
    contextMenuSettings: {
     file: ["Custom", "Open", "|", "Delete", "Download", "Rename", "|", "Details"],
     folder: ["Custom", "Open", "|", "Delete", "Download", "Rename", "|", "Details"],
     layout: ["Custom", "SortBy", "View", "Refresh", "|", "NewFolder", "Upload", "|", "Details", "|", "SelectAll"],
     visible: true
    },
    menuOpen: menuOpen,
    menuClick: menuClick
});

// Icon added to custom menu item
function menuOpen(args: MenuOpenEventArgs) {
    for(let i: number = 0; i<args.items.length; i++) {
        if(args.items[i].id === this.element.id +'_cm_custom') {
            args.items[i].iconCss= 'e-icons e-fe-tick';
        }
    }
}

// event for custom menu item
function menuClick(args: MenuClickEventArgs) {
    if (args.item.text === 'Custom') {
        alert('You have clicked custom menu item')
    }
}

// render initialized FileManager
filemanagerInstance.appendTo('#filemanager');


