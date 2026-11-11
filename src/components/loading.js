
export function renderLoading() {

    let loadingHTML = "";

    for (let i = 0; i < 5; i++) {

        loadingHTML += `
            <div class="min-w-[160px] bg-gray-900 rounded-lg overflow-hidden">

                <div class="h-[230px] bg-gray-700 animate-pulse"></div>

                <div class="p-3">
                    <div class="h-4 bg-gray-700 rounded animate-pulse mb-3"></div>
                    <div class="h-3 bg-gray-700 rounded animate-pulse w-1/2"></div>
                </div>

            </div>
        `;
    }

    return `
        <div class="flex gap-5 overflow-hidden">
            ${loadingHTML}
        </div>
    `;
}
