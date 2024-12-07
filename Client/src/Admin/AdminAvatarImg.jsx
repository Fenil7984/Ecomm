import { useSelector } from "react-redux";

export default function AdminAvtarImg({lg}) {

    const { adminData } = useSelector((state) => state.admin);
    return (
        <>
              <div className={`adminImg`}>
                    <span className={`rounded-circle ${lg===true && 'lg'}`}>
                      <img
                        src={adminData.userData.profileImg}
                        alt=""
                        className=""
                      />
                    </span>
                  </div>
        </>
    )
}