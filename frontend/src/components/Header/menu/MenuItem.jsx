
export default function MenuItem({item}){
    return(
        <a href={item.href} className='block px-4 py-2 text-sm text-gray-700'>
            {item.name}
        </a>

    )
}