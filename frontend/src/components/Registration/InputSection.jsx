export default function InputSection({id,name}){
    return (
        <div className={`col-span-6 ${name==='Email'?'':"md:col-span-3"}`}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {name}
            </label>
            <input type="text" id={id}
                   className="mt-1 p-2 w-full rounded-lg border text-gray-900 text-sm shadow-sm"/>
        </div>
    )
}