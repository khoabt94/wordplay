import { Button, ScrollShadow } from "@nextui-org/react";
import TableItem from "./table";
import { useAuthStore, useSocketStore, useStateMatch } from "@/stores";
import { useGetTables } from "@/hooks/queries";
import { useEffect, useMemo } from "react";
import { RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/utils";
import { ClientToServerEventsKeys, ServerToClientEventsKeys } from "@/constants";
import AppLoading from "@/components/common/app-loading";

export default function Tables() {
    const { isFindingMatch } = useStateMatch()
    const { toastError } = useToast()
    const { user } = useAuthStore()
    const { socket } = useSocketStore()
    const { data: dataTables, refetch } = useGetTables({
        refetchOnWindowFocus: true,
    })
    const tables = useMemo(() => dataTables?.tables || [], [dataTables])

    const handleJoinSpecificTable = (tableId: string) => {
        if (!socket || !user) return;
        socket.emit(ClientToServerEventsKeys.join_specific_table, {
            tableId,
            user_id: user._id as string
        })
    }

    useEffect(() => {
        if (!socket) return;

        socket.on(ServerToClientEventsKeys.join_specific_table_error, (data) => {
            toastError(data.message)
            refetch()
        })

        return () => {
            socket.off(ServerToClientEventsKeys.join_specific_table_error, () => console.log('join-specific-table-error'));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    return (
        <div className="mt-4 h-full overflow-y-hidden">
            <div className="relative w-full flex items-center justify-between">
                <h3 className="bg-gray-900 block z-10 px-2">Available Tables</h3>
                <div className="pl-2 z-10 bg-gray-900">
                    <Button
                        type="button"
                        variant="ghost"
                        className=" bg-gray-900 !w-10 min-w-0 h-10 px-0 flex justify-center disabled:cursor-not-allowed"
                        onClick={() => refetch()}
                        isDisabled={isFindingMatch}
                    >
                        <RefreshCw />
                    </Button>
                </div>
                <div className="absolute h-[1px] w-full bg-gray-700 top-1/2 translate-y-1/2" />
            </div>
            <ScrollShadow size={0} hideScrollBar className="mt-4 h-[500px] w-full overflow-x-hidden py-4 px-2 relative">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    {tables.map((table) => <TableItem key={table.table_id} table={table} onClickJoin={() => handleJoinSpecificTable(table.table_id)} />)}
                </div>
                {isFindingMatch ? <div className="absolute inset-0 rounded-xl backdrop-blur-2xl z-50"><AppLoading className="bg-transparent h-full" /></div> : null}

            </ScrollShadow>
        </div>
    )
}
