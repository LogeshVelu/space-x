export const launchUTCFormetChanged = (dataString) => {
    const date = new Date(dataString);
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getUTCFullYear();

    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${day} ${month} ${year} at ${hours}:${minutes}`;
}
export const launchStatus = (launchData) => {
   if(launchData?.upcoming){
        return { label: 'Upcoming', color: 'orange' };
   }else if(launchData?.launch_success && launchData?.launch_success !== null){
        return { label: 'Success', color: 'green' };
   }else{
        return { label: 'Failed', color: 'red' };
   }
}