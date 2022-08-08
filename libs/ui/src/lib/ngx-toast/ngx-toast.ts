import {ComponentRef} from '@angular/core';
import {ToastRef} from 'ngx-toastr';
import {Observable} from 'rxjs';

const iconClases =
    {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
    };

export interface IActiveToast
{
    /** Your Toast ID. Use this to close it individually */
    toastId: number;
    /** the title of your toast. Stored to prevent duplicates if includeTitleDuplicates set */
    title: string;
    /** the message of your toast. Stored to prevent duplicates */
    message: string;
    /** a reference to the component see portal.ts */
    portal: ComponentRef<any>;
    /** a reference to your toast */
    toastRef: ToastRef<any>;
    /** triggered when toast is active */
    onShown: Observable<any>;
    /** triggered when toast is destroyed */
    onHidden: Observable<any>;
    /** triggered on toast click */
    onTap: Observable<any>;
    /** available for your use in custom toast */
    onAction: Observable<any>;
}
