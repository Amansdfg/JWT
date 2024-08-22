import {settingsMenu} from "../../util/list.js";
export default function Setting(){
    return (
        <section className="px-10 py-12">
            <div className='ml-[300px] flex flex-col gap-4'>
                {settingsMenu.map(item=>(
                    <a className="flex items-center" key={item.id} href={item.href}>
                        <img src={item.image} alt={item.name} className="mr-3 "/>
                        <span className="text-2xl">{item.title}</span>
                    </a>
                ))}
            </div>
            <div>

            </div>
        </section>
    )
}