export default function AdminPageLayout({ form, list, extra }) {
    return (
        <div className="space-y-6">
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                <div className="min-w-0">{form}</div>
                <div className="min-w-0">{list}</div>
            </div>
            {extra}
        </div>
    );
}
