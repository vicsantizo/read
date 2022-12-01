import { useState, ChangeEvent } from 'react';

const Search = () => {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const deleteInputValue = () => {
    setValue('');
  };

  return (
    <div className="relative">
      <button tabIndex={-1}>
        <svg
          className="fill-gray-500 absolute top-[50%] translate-y-[-50%] left-[10px] hover:fill-gray-300"
          width={18}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 183.792 183.792"
          xmlSpace="preserve"
        >
          <path d="M54.734 9.053C39.12 18.067 27.95 32.624 23.284 50.039c-4.667 17.415-2.271 35.606 6.743 51.22 12.023 20.823 34.441 33.759 58.508 33.759 7.599 0 15.139-1.308 22.287-3.818l30.364 52.592 21.65-12.5-30.359-52.583c10.255-8.774 17.638-20.411 21.207-33.73 4.666-17.415 2.27-35.605-6.744-51.22C134.918 12.936 112.499 0 88.433 0 76.645 0 64.992 3.13 54.734 9.053zm70.556 37.206c5.676 9.831 7.184 21.285 4.246 32.25-2.938 10.965-9.971 20.13-19.802 25.806-6.462 3.731-13.793 5.703-21.199 5.703-15.163 0-29.286-8.146-36.857-21.259-5.676-9.831-7.184-21.284-4.245-32.25 2.938-10.965 9.971-20.13 19.802-25.807C73.696 26.972 81.027 25 88.433 25c15.164 0 29.286 8.146 36.857 21.259z" />
        </svg>
      </button>
      <input
        value={value}
        onChange={handleChange}
        placeholder="Search book..."
        className="rounded-3xl bg-[#1f1f23] py-2 pl-10 pr-7 border border-gray-500 w-[35ch] min-w-[25ch] xl:w-[45ch] 2xl:w-[55ch] focus:border-[#3d65af] outline-none"
      />
      <button
        onClick={deleteInputValue}
        className="absolute right-0 top-[50%] translate-y-[-50%] right-[14px] text-gray-500 hover:text-gray-300 outline-none focus:text-gray-200"
      >
        x
      </button>
    </div>
  );
};

export default Search;
