const List = () => {
  const map = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <section className="p-4">
      {map.map(() => (
        <li className="relative mb-9 h-28 w-full list-none rounded-[0.4375rem] bg-white shadow-[1px_1px_4px_0_rgba(0,0,0,0.1)]">
          <button className="h-full w-full" type="button">
            <img
              src="https://design-assets.adobeprojectm.com/content/download/express/public/urn:aaid:sc:VA6C2:180050e9-c5a2-5727-bb4a-060a4e5f3e4f/component?assetType=TEMPLATE&etag=0626362559cf4496b9a6fa230721b20a&revision=5aa7225d-0d4c-4a09-97cb-6b6c088f4b30&component_id=37c733f5-433e-4dbb-af3c-29c43640b841"
              alt="책 커버"
              className="absolute bottom-0 left-5 h-32 w-[5.7rem] shadow-[3px_0px_4px_0_rgba(0,0,0,0.25)]"
            />
            <span className="absolute bottom-0 left-6 block h-32 w-[0.0625rem] bg-black opacity-50 blur-[2px]" />
            <div className="ml-32 flex h-full flex-col items-start py-[0.6rem]">
              <img
                src={`${import.meta.env.VITE_IMG_BASE_URL || ''}/assets/stars.png`}
                alt="3점/5점"
                className="w-[5.5rem]"
              />
              <p className="flex grow items-center justify-center pr-2 text-start text-lg font-semibold leading-6">
                망그러진보그러진망그러진보그러진곰
              </p>
              <p className="text-[0.8125rem] opacity-50">2018.04.16 - 2024.12.12</p>
            </div>
          </button>
          <span className="absolute right-[0.4rem] top-[0.6rem] flex h-4 w-10 items-center rounded-2xl border px-2 py-[0.125rem] text-[0.575rem]">
            1회독
          </span>
        </li>
      ))}
    </section>
  );
};

export default List;
