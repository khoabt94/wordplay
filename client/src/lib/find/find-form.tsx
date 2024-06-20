import { Select, SelectItem } from "@nextui-org/select";
import {
    Button,
} from "@nextui-org/react";

export default function FindForm() {
    return <div className="grid grid-cols-2 mt-4 gap-4">
        <Select
            label="Game Mode"
            className="text-xl"
            variant='faded'
            defaultSelectedKeys={'freestyle'}
        >
            <SelectItem key={'freestyle'}>
                Freestyle
            </SelectItem>
            <SelectItem key={'non-repeat'}>
                Non-repeat
            </SelectItem>
        </Select>
        <Select
            label="Game Language"
            className="text-xl"
            variant='faded'
            defaultSelectedKeys={'vn'}
        >
            <SelectItem key={'vn'}>
                Vietnam
            </SelectItem>
            <SelectItem key={'en'}>
                English
            </SelectItem>
        </Select>
        <Button className='h-[56px] col-span-2 text-xl font-bold uppercase' variant='solid' color='primary' >
            Find Match
        </Button>
    </div>
}
