

import { FileManager, Toolbar, NavigationPane, DetailsView, FileLoadEventArgs } from '@syncfusion/ej2-filemanager';
import { getValue, select } from '@syncfusion/ej2-base';
import { Tooltip, TooltipEventArgs } from '@syncfusion/ej2-popups';

FileManager.Inject(Toolbar, NavigationPane, DetailsView)

let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
// initialize file manager component
let fileObj: FileManager = new FileManager({
  ajaxSettings: {
        url: hostUrl + 'api/FileManager/FileOperations',
        uploadUrl: hostUrl + 'api/FileManager/Upload',
        downloadUrl: hostUrl + 'api/FileManager/Download',
        getImageUrl: hostUrl + 'api/FileManager/GetImage'
    },
    created: () => { addTooltip(); },
    fileLoad: (args: FileLoadEventArgs) => {
        //Native tooltip customization to display additonal information in new line
        let target: Element = args.element;
        if (args.module==='DetailsView') {
            let element: Element = select('[title]', args.element);
            let title: string = getValue('name', args.fileDetails) +
                '\n' + getValue('dateModified', args.fileDetails);
            element.setAttribute('title', title);
        } else if (args.module==='LargeIconsView') {
            let title: string = getValue('name', args.fileDetails) +
                '\n' + getValue('dateModified', args.fileDetails);
            target.setAttribute('title', title);
        }
    }
});

// render initialized FileManager
fileObj.appendTo('#filemanager');

function addTooltip() {
    let tooltip: Tooltip = new Tooltip({
        target: '#' + fileObj.element.id + '_toolbar [title]',
        beforeRender: onTooltipBeforeRender
    });
    tooltip.appendTo('#' + fileObj.element.id + '_toolbar');
}

function onTooltipBeforeRender(args: TooltipEventArgs) {
    let buttonId: string = select('button', args.target).id;
    let description: string = '';
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
            for (let i: number = 0; i < fileObj.selectedItems.length; i++) {
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


