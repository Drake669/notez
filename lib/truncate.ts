export default function truncate (value: string){
    if(value.length > 15) return `${value.slice(0,15)}...`
    return value
}