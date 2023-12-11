import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchAllUniv } from '../fetures/universities/action';
import Modal from '../components/Modal';

export const Home = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.univ);
  const [detail, setDetail] = useState({
    no: '',
    name: '',
    web: '',
  });
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    dispatch(fetchAllUniv());
  }, [dispatch]);

  const onDetail = (name: string, idx: number) => {
    setShowDetail(true);
    const data_detail = data.find((val) => val.name === name);
    setDetail({
      no: `${idx}`,
      name: data_detail?.name || '',
      web: data_detail?.web_pages[0] || '',
    });
  };
  return (
    <React.Fragment>
      <div className="w-full h-screen flex justify-center items-center">
        {!loading ? (
          <div className="w-full flex flex-col gap-2 md:max-w-xl">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">No</th>
                  <th className="px-4 py-3">Nama Universitas</th>
                  <th className="px-4 py-3">Website</th>
                </tr>
              </thead>
              {data.map((val, idx) => (
                <tbody className="bg-white">
                  <tr className="text-gray-700">
                    <td className="px-4 py-3 border">{idx + 1}</td>
                    <td
                      className="px-4 py-3 text-ms font-semibold border cursor-pointer"
                      onClick={() => onDetail(val.name, idx + 1)}
                    >
                      {val.name}
                    </td>
                    <td className="px-4 py-3 text-xs border">
                      <a
                        href={val.web_pages[0]}
                        target="_blank"
                        className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"
                      >
                        {val.web_pages[0]}
                      </a>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        ) : (
          <>Loading..</>
        )}
      </div>
      <Modal size="sm" show={showDetail} onClose={() => setShowDetail(false)} backdropStatic>
        <div className="bg-white drop-shadow-lg p-5 rounded-lg flex flex-col gap-5">
          <div className="w-full flex flex-col gap-3">
            <p>No: {detail.no}</p>
            <p>Nama: {detail.name}</p>
            <p>Website: {detail.web}</p>
          </div>
          <button
            className="px-8 py-3 border border-black rounded-lg font-semibol"
            onClick={() => setShowDetail(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </React.Fragment>
  );
};
