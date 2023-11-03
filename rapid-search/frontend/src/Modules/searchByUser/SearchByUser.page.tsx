import { ChangeEvent, useEffect, useState } from "react";
import RInput from "../../components/Elements/Input/RInput.component";
import RapidApiService from "../../service/RapidApi.service";
import { Button, Table } from "antd";
import RSelect from "../../components/Elements/selects/RSelect.components";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  AtomPlatformStore,
  AtomSearchByUserInputResultsList,
} from "../../store/userSearch.store";
import { ColumnsType } from "antd/es/table";
import { UserSearchDTO } from "../../Model/userSearch.model";
import moment from "moment";
import { SearchResultDTO } from "../../Model/searchResult.model";
import { AtomLoggedUser } from "../../store/auth.store";

const SearchByUserPage = () => {
  const [userSearchInput, setUserSearchInput] = useState<UserSearchDTO>(
    {} as UserSearchDTO
  );
  const { fetchPlatforms, SearchByUserInput } = RapidApiService();
  const [platformList, setPlatformList] = useRecoilState(AtomPlatformStore);
  const [loggedUser, setLoggedUser] = useRecoilState(AtomLoggedUser);
  const [dataSource, setDataSource] = useRecoilState(
    AtomSearchByUserInputResultsList
  );

  useEffect(() => {
    fetchPlatforms({ setPlatformList });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserSearchInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const columns: ColumnsType<SearchResultDTO> = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (_) => {
        return <span style={{ textTransform: "capitalize" }}>{_}</span>;
      },
    },
    {
      title: "Artist Name",
      dataIndex: "artistNames",
      key: "artistNames",
      render: (_, rowData) => {
        return rowData?.data?.artistNames
          ? rowData?.data?.artistNames.map((x: string) => {
              return <span>{x}, </span>;
            })
          : "NA";
      },
    },
    {
      title: "Album Name",
      dataIndex: "albumName",
      key: "albumName",
      render: (_, rowData) => {
        return rowData?.data?.albumName ? rowData?.data?.albumName : "NA";
      },
    },
    {
      title: "Album Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (_, rowData) => {
        const imgURL = rowData?.data?.imageUrl;
        return imgURL ? <img src={imgURL} height={50} width={50}></img> : "NA";
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, rowData) => {
        return rowData?.data?.name;
      },
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
      render: (_, rowData) => {
        const _url = rowData?.data?.url;
        return _url ? (
          <a href={_url} target="_blank">
            click here to open the song
          </a>
        ) : (
          "NA"
        );
      },
    },

    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (_, rowData) => {
        const _ms = rowData?.data?.duration;
        var tempTime = moment.duration(_ms);
        var y = _ms ? `${tempTime.minutes()}m ${tempTime.seconds()}s` : "NA";
        return y ?? "-";
      },
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
    },
  ];

  const handleSelectChange = (e: string) => {
    setUserSearchInput((prevInput) => ({
      ...prevInput,
      ["source"]: e,
    }));
  };

  const handleSearch = () => {
    SearchByUserInput({
      dataSource,
      setDataSource,
      userSearchInput,
      loggedUser,
      setLoggedUser,
    });
  };
  return (
    <>
      <h2>Search By User Input</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          flexWrap: "wrap",
          gap: "1rem",
          padding: " 1rem 0",
        }}
      >
        <RInput
          name="track"
          value={userSearchInput.track}
          onChange={handleChange}
          label={"Track"}
          placeHolder={"Enter track name"}
        />
        <RInput
          name="artist"
          value={userSearchInput.artist}
          onChange={handleChange}
          label={"Artist name"}
          placeHolder={"Enter artist name"}
        />
        <RInput
          name="type"
          value={userSearchInput.type}
          onChange={handleChange}
          label={"Type"}
          placeHolder={"Enter type of music"}
        />
        <RSelect
          value={userSearchInput.source}
          placeHolder={"Select Platforms"}
          label={"Platforms"}
          options={platformList}
          onChange={handleSelectChange}
        />
        <Button
          type="primary"
          style={{ marginTop: "0.8rem" }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>

      <Table dataSource={dataSource} columns={columns} bordered size="large" />
    </>
  );
};

export default SearchByUserPage;
