import { FileManager, Toolbar, NavigationPane, DetailsView, sortComparer, SortComparer } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView)

let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
// initialize File Manager component
let filemanagerInstance: FileManager = new FileManager({
    ajaxSettings: {
        url: hostUrl + 'api/NaturalSorting/FileOperations',
        getImageUrl: hostUrl + 'api/NaturalSorting/GetImage',
        uploadUrl: hostUrl + 'api/NaturalSorting/Upload',
        downloadUrl: hostUrl + 'api/NaturalSorting/Download'
    },
    sortComparer: sortComparer as SortComparer,
    detailsViewSettings: {
        columns: [
            {field: 'name', headerText: 'File Name', minWidth: 120, width: 'auto', customAttributes: { class: 'e-fe-grid-name' },template: '${name}', sortComparer: sortComparer as SortComparer},
            {field: 'size', headerText: 'File Size',minWidth: 50, width: '110', template: '${size}'},
            { field: '_fm_modified', headerText: 'Date Modified',minWidth: 50, width: '190'}
        ]
    }
});
// render initialized FileManager
filemanagerInstance.appendTo('#filemanager');