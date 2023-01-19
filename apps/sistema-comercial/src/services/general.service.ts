import {Injectable} from '@angular/core';
import {DateTime} from 'luxon';
import {v4 as uuidv4} from 'uuid';
import {deleteObject, ref, Storage, uploadBytesResumable, UploadTask} from '@angular/fire/storage';
import {NgxToastService} from '#/apps/sistema-comercial/src/services/ngx-toast.service';
import {Observable, ReplaySubject} from 'rxjs';

export interface IObjFecha
{
    year: number;
    month: number;
    day: number;
}

@Injectable({
    providedIn: 'root'
})
export class GeneralService
{
    private static ano = new Date().getFullYear();
    private static mes = new Date().toLocaleString('es-mx', {month: 'long'});
    private porcentaje: ReplaySubject<number> = new ReplaySubject<number>();

    // private porcentaje: Subject<number> = new Subject<number>();

    constructor(private storage: Storage, private ngxToastService: NgxToastService)
    {
    }

    static convertirUnix(fecha: IObjFecha, segundos: number): number
    {
        // const current = new Date();
        // current.setHours(new Date().getHours());
        // current.setMinutes(new Date().getMinutes());
        // current.setFullYear(fecha.year, fecha.month, fecha.date);
        // const timestamp = current.getTime();
        // const timestampSeg = DateTime.fromMillis(timestamp, {zone: 'America/Mexico_City'}).toUnixInteger();

        // const horaASegundos = new Date().getHours() * 3600;
        // const minutos = new Date().getMinutes() * 60;
        // return (segundos / 1000) + horaASegundos + minutos;

        // const tiempo = DateTime.local(fecha.year, fecha.month, fecha.date, new Date().getHours(), new Date().getMinutes(), {zone: 'America/Mexico_City'});
        // return DateTime.utc(fecha.year, fecha.month + 1, fecha.date, new Date().getHours(), new Date().getMinutes(), {locale: 'es-MX'}).toUnixInteger();
        return DateTime.fromObject({year: fecha.year, month: fecha.month, day: fecha.day, hour: new Date().getHours(), minute: new Date().getMinutes()}).toUnixInteger();
    }

    static fechaHoraActual(): number
    {
        // console.log(DateTime.local({zone: 'America/Mexico_City'}).toUnixInteger());
        // console.log(DateTime.utc({locale: 'es-MX'}).toUnixInteger())
        return DateTime.utc({locale: 'es-MX'}).toUnixInteger();
    }

    static nombreArchivo(nombreActual: string): string
    {
        return this.ano + '-' + uuidv4() + '.' + nombreActual.split('.').pop();
    }

    static rutaGuardar(tipoDoc: string, nombreArchivo: string, carpeta: string): string
    {
        if (carpeta === 'perfil')
        {
            return `SIMAPAS/perfil/${this.nombreArchivo(nombreArchivo)}`;
        } else
        {
            return `SIMAPAS/${carpeta}/${tipoDoc}/${this.ano}/${this.mes}/${this.nombreArchivo(nombreArchivo)}`;
        }
    }

    async subirFirebase(archivo: File, url: string): Promise<UploadTask>
    {
        const docRef = ref(this.storage, url);
        const subirDoc: UploadTask = uploadBytesResumable(docRef, archivo);
        subirDoc.on('state_changed', (snapshot) =>
        {
            this.porcentaje.next((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        }, err => this.ngxToastService.errorToast(err.message, 'Error al subir el archivo'));
        return subirDoc;
    }

    progreso(): Observable<number>
    {
        return this.porcentaje;
    }

    async eliminarDocFirabase(rutaDocEliminar): Promise<void>
    {
        const refDocEliminar = ref(this.storage, rutaDocEliminar);
        try
        {
            await deleteObject(refDocEliminar);
        } catch (e)
        {
            this.ngxToastService.errorToast(e.message, 'Error al tratar de eliminar archivo');
        }
    }
}
