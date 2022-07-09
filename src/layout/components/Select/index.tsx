import React from 'react'
import Select from "react-select"

interface Iprops {
    placeholder:string,
    label:string,
    setter:(value:string)=>void,
    options:{label:string,value:string}[]
}

function MySelect({placeholder,label,setter,options}:Iprops) {
  return (
    <div className='flex flex-col gap-2'>
                    <label htmlFor="">{label}</label>
                    <Select
                    placeholder={placeholder}
                    isSearchable={false}
                     styles={{
                        option : (base) => ({
                            ...base,
                            backgroundColor: "#122640",
                            padding: 5,
                            borderRadius:8,
                            color:'white',
                            outline:'none'
                          }),
                          menu : (base) => ({
                            ...base,
                            backgroundColor: "#122640",
                            padding: 5,
                            borderRadius:8,
                            color:'white',
                            outline:'none'
                          }),
                          control : (base) => ({
                            ...base,
                            backgroundColor: "#122640",
                            // padding: 5,
                            borderRadius:8,
                            color:'white',
                            border:'none'
                          }),
                        valueContainer: (base) => ({
                            ...base,
                            padding: 5,
                            borderRadius: 5,
                            background: "#122640",
                            color: 'white',
                            display: 'flex',
                          }),
                          singleValue:(base)=>({
                            ...base,
                            color:'white'
                          })
                      }}
                    onChange={(value)=>setter(value!.value)} options={options}/>
                </div>
  )
}

export default MySelect