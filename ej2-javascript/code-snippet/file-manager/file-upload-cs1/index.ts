

import { Uploader } from '@syncfusion/ej2-inputs';
import { Dialog } from '@syncfusion/ej2-popups';
import { FileManager, FileOpenEventArgs, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';
import { Button } from '@syncfusion/ej2-buttons';;

FileManager.Inject(Toolbar, NavigationPane, DetailsView)

// Initialize the Uploader component
let uploadObject: Uploader = new Uploader();
uploadObject.appendTo('#fileupload');

// Initialize the Button component
let btnObj: Button = new Button();
btnObj.appendTo('#openBtn');

// Initialize the Dialog component
let dialogObj: Dialog = new Dialog({
    header: 'Open',
    showCloseIcon: true,
    closeOnEscape: false,
    width: '850px',
    visible: false,
    target: document.getElementById('target'),
    animationSettings: { effect: 'None' },
    open: dialogOpen,
    close: dialogClose
});
dialogObj.appendTo('#dialog');

let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
document.getElementById('openBtn').onclick = (): void => {
    dialogObj.show();
    // Initialize the FileManager component
    let filemanagerInstance: FileManager = new FileManager({
        ajaxSettings: {
            url: hostUrl + 'api/FileManager/FileOperations',
            getImageUrl: hostUrl + 'api/FileManager/GetImage',
            uploadUrl: hostUrl + 'api/FileManager/Upload',
            downloadUrl: hostUrl + 'api/FileManager/Download'
        },
        allowMultiSelection: false,
        fileOpen : onFileOpen
    });
    filemanagerInstance.appendTo('#filemanager');
    dialogOpen();
};

// Uploader will be shown, if Dialog is closed
function dialogClose(): void {
    let filemanager: FileManager = (document.getElementById('filemanager') as any).ej2_instances[0];
    filemanager.destroy();
    document.getElementById('container').style.display = 'block';
}

// Uploader will be hidden, if Dialog is opened
function dialogOpen(): void {
    document.getElementById('container').style.display = 'none';
}

// File Manager's fileOpen event function
function onFileOpen(args: FileOpenEventArgs): void {
    let file: any = (args as any).fileDetails;
    if (file.isFile) {
        args.cancel = true;
        uploadObject.files = [{name: file.name, size: file.size, type: file.type }];
        dialogObj.hide();
    }
}



