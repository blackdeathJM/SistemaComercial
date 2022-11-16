import {Injectable} from '@nestjs/common';
import path, {join} from 'path';
import fs from 'fs-extra';
import {UploadDto} from '#api/libs/models/src/lib/upload/upload.dto';

@Injectable()
export class SubirArchivosService
{
    async subirArchivos(files: UploadDto): Promise<string[]>
    {
        const ano = new Date().getFullYear();
        const mes = new Date().toLocaleString('es-mx', {month: 'long'});
        const rutas: string[] = [];
        let rutaDeGuardado: string;

        if (files.carpeta === 'perfil')
        {
            rutaDeGuardado = join(__dirname, 'public/perfil');
        } else
        {
            rutaDeGuardado = join(__dirname, `public/${files.carpeta}/${ano}/${mes}`);
        }
        try
        {
            console.log('=======>', rutaDeGuardado);
            await fs.ensureDir(path.join(__dirname, 'temporal'));
            // if (files.eliminar)
            // {
            //     const archivoExiste = await fs?.pathExists(files.url);
            //     if (archivoExiste)
            //     {
            //         await fs?.remove(files.url, (err) =>
            //         {
            //             console.log('remover', err);
            //             // accion si el archivo no se puede eliminar
            //         });
            //     }
            // }
            // for (const archivo of await files.file)
            // {
            // }
        } catch (e)
        {
            console.log('error', e);
            return [];
        }
    }
}

// try
// {
//     if (files.carpeta === 'Perfil')
//     {
//         // path.join()
//         rutaDeGuardado = 'perfil';
//     }
//     rutaDeGuardado = join(__dirname, `assets/public/${files.carpeta}/${ano}/${mes}`);
//     console.log('rutaGuar', rutaDeGuardado);
//     for (const file of await files.file)
//     {
//         Promise.resolve(file).then((archivos) =>
//         {
//             const {createReadStream, filename} = archivos;
//             console.log('filename', createReadStream());
//             const nvoNombre = ano + '-' + randomUUID() + '.' + filename.split('.').pop();
//             const rutaGuardar = join(rutaDeGuardado + `/${nvoNombre}`);
//             // if (!fs.existsSync(rutaDeGuardado))
//             // {
//             //     fs.mkdirSync(rutaDeGuardado);
//             // }
//
//             const salida = fs.createWriteStream(rutaGuardar);
//             const stream = createReadStream();
//             stream.pipe(salida);
//             rutas.push(rutaGuardar);
//         }).catch(err => console.log('error al resolver', err));
//
//
//         // fs.ensureDir(rutaDeGuardado).then(() => console.log('creado el dir')).catch(err => console.log(err));
//     }
//     return rutas;
// } catch (e)
// {
//     console.log('en el catch', e);
//     return [];
// }
