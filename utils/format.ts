export function formFileNameAsTitle(fileName:string){
    const withoutExtension=fileName.replace(/\.[^/.]+$/,'');
    const withspaces=withoutExtension.replace(/[-_]+/g,'').replace(/([a-z])([A-Z])/g,'$1 $2');

    return withspaces.split(' ').map((word)=>word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ').trim();
}