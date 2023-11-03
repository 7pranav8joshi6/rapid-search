import { ChangeEvent, useState } from "react";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import RapidApiService from "../../service/RapidApi.service";
import RInput from "../../components/Elements/Input/RInput.component";
import moment from "moment";
import { useRecoilState, useRecoilValue } from "recoil";
import { AtomSearchResultByUrlList } from "../../store/userSearch.store";
import { SearchResultDTO } from "../../Model/searchResult.model";
import { AtomLoggedUser } from "../../store/auth.store";

const SearchByUrlPage = () => {
  const [dataSource, setDataSource] = useRecoilState(AtomSearchResultByUrlList);
  const [userUrl, setUserUrl] = useState<string>("");
  const { searchByUrl } = RapidApiService();
  const [loggedUser, setLoggedUser] = useRecoilState(AtomLoggedUser);

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserUrl(e.target.value);
  };

  const handleSearch = () => {
    searchByUrl({
      dataSource,
      setDataSource,
      userUrl,
      loggedUser,
      setLoggedUser,
    });
    setUserUrl("");
  };

  return (
    <>
      <h2>Search By URL</h2>
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
          name="userUrl"
          value={userUrl}
          onChange={handleChange}
          label={"Enter URL"}
          placeHolder={"Enter URL of any song or track to get details."}
          width={"800px"}
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

export default SearchByUrlPage;
