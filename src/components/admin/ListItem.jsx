'use client';

import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import SubmitButton from './SubmitButton';
import { useRouter } from 'next/navigation';

const ListItem = ({
    title,
    subtitle,
    type,
    remark,
    handleDelete,
    onSuccess,
    editLink,
}) => {
    const router = useRouter();
    const mutation = useMutation({
        mutationFn: async () => {
            await handleDelete();
        },
        onSuccess: () => {
            router.refresh();
            onSuccess?.();
        },
    });
    return (
        <li className="bg-[#E9E9E8] p-4">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-lg font-medium text-[#696969]">
                        {title}
                    </p>
                    {subtitle && (
                        <p className="text-sm text-[#9E9E9E]">{subtitle}</p>
                    )}
                </div>
                <div className="flex gap-2.5">
                    {editLink && (
                        <Link href={editLink}>
                            <SubmitButton label="EDIT" />
                        </Link>
                    )}
                    {type === 'request-status' && (
                        <SubmitButton label="APPROVED" />
                    )}
                    {type === 'saved' ||
                        (type === 'request-status' && (
                            <SubmitButton label="VIEW" />
                        ))}

                    {type !== 'request-status' && (
                        <SubmitButton
                            onClick={mutation.mutate}
                            disabled={mutation.isPending}
                            label="DELETE"
                        />
                    )}
                </div>
            </div>
            {remark && (
                <div className="flex text-[#696969] text-lg">
                    <span className="block shrink-0">REMARK : &nbsp;</span>
                    <span className="block flex-1">{remark}</span>
                </div>
            )}
        </li>
    );
};

export default ListItem;
