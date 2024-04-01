"use client";

import { tokenStore, userStore } from "@/store/userStore";
import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdDone } from "react-icons/md";
import Image from "next/image";
import Input from "@/components/UI/Input";
import { getCurrentUser, updateCurrentUser } from "@/services/userService";
import { toastStore } from "@/store/toastStore";
import { ICustom, IDetailUser } from "@/interfaces/detailUser";
import { ICurrentUser } from "@/interfaces/user";

export interface IAccountProps {
  currentUser: IDetailUser;
}

export default function Account(props: IAccountProps) {
  const router = useRouter();

  const { user, setUser } = userStore();
  const { accessToken } = tokenStore();
  const { setToast } = toastStore();

  const [updateUser, setUpdateUser] = useState<ICurrentUser | null>(user);
  const [loading, setLoading] = useState(false);
  const [tag, setTag] = useState<any>();
  const [tags, setTags] = useState<ICustom[]>(user?.tags.custom || []);

  const handleOnChange = (name: string, value: string) => {
    if (updateUser) {
      setUpdateUser({ ...updateUser, [name]: value });
    }
  };

  const handleUpdate = async () => {
    const res = await updateCurrentUser(updateUser, accessToken);
    if (res) {
      setToast("Account updated");
      setUser(res);
    } else {
      setToast("Account update failed");
    }
  };

  const checkValue = (value: string) => {
    return tags.map((item: ICustom, i: number) => {
      if (item.title === value) {
        return false;
      }
      return true;
    });
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (checkValue(tag)) {
        // tags.push({ type: "search", title: e.target.value });
        setTag("");
      }
    }
  };

  const onDelete = (index: number) => {
    setTags(tags.filter((tag: ICustom, i: number) => i !== index));
  };

  useEffect(() => {
    if (accessToken) {
      const getUser = async () => {
        const res = await getCurrentUser(accessToken);
        setUser(res);
        setUpdateUser(res);
      };
      getUser();
    } else {
      router.push("/");
    }
  }, [accessToken]);

  useEffect(() => {
    setLoading(true);
  }, [user]);

  return (
    <div className="flex justify-center">
      <div className="w-main py-16">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-4 w-full md:w-1/3 lg:w-1/4">
            <p className="font-bold text-lg mb-4">Account settings</p>
            <p className="text-nor text-text">Edit profile</p>
            <p className="text-nor text-grey underline">Hiring</p>
            <p className="text-nor text-grey underline">Download history</p>
            <p className="text-nor text-grey underline">Email settings</p>
            <p className="text-nor text-grey underline">Change password</p>
            <p className="text-nor text-grey underline">Connect accounts</p>
            <p className="text-nor text-grey underline">Applications</p>
            <p className="text-nor text-grey underline">Close account</p>
          </div>
          {loading && user && (
            <div className="flex flex-col gap-4 w-full md:w-2/3 lg:w-3/4">
              <div className="flex flex-col gap-6 md:flex-row justify-between">
                <p className="font-bold text-lg mb-4">Edit profile</p>
                {user?.confirmed && (
                  <div className="flex gap-1 h-6 items-center w-max capitalize text-mini px-3 text-[#36a162] bg-[#b7e7cb] rounded-3xl">
                    <MdDone className="size-[15px]" />
                    account confirmed
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="flex flex-col gap-6 md:w-1/3">
                  <div className="flex flex-col items-center gap-4">
                    <Image
                      src={
                        user?.profile_image?.large ||
                        "https://images.unsplash.com/placeholder-avatars/extra-large.jpg?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
                      }
                      height={128}
                      width={128}
                      alt="avt"
                      className="rounded-full border"
                    />
                    <button className="text-[13px] text-grey underline hover:text-black">
                      Change profile image
                    </button>
                  </div>
                  <div className="flex flex-col items-start gap-4">
                    <p className="text-nor">Badge</p>
                    <p className="text-[13px] text-grey">
                      {user?.badge || "You don't have any badges yet :("}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 md:w-2/3">
                  <div className="flex flex-col md:flex-row gap-4">
                    <Input
                      label="First name"
                      value={updateUser?.first_name || ""}
                      onChange={(e) =>
                        handleOnChange("first_name", e.target.value)
                      }
                    />
                    <Input
                      label="Last name"
                      value={updateUser?.last_name || ""}
                      onChange={(e) =>
                        handleOnChange("last_name", e.target.value)
                      }
                    />
                  </div>
                  <Input
                    label="Email"
                    type="email"
                    value={updateUser?.email || ""}
                    onChange={(e) => handleOnChange("email", e.target.value)}
                  />
                  <Input
                    label="Username"
                    value={updateUser?.username || ""}
                    onChange={(e) => handleOnChange("username", e.target.value)}
                  />
                  <p className="text-[13px] text-grey">
                    https://unsplash.com/@<strong>quyennt201</strong>
                  </p>
                </div>
              </div>
              <p className="font-bold text-lg my-4">About</p>
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  label="Location"
                  value={updateUser?.location || ""}
                  onChange={(e) => handleOnChange("location", e.target.value)}
                />
                <Input
                  label="Personal site/portfolio"
                  placeholder="https://"
                  value={updateUser?.portfolio_url || ""}
                  onChange={(e) =>
                    handleOnChange("portfolio_url", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-1/2">
                  <Input
                    label="Bio"
                    value={updateUser?.bio || ""}
                    onChange={(e) => handleOnChange("bio", e.target.value)}
                    area
                  />
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                  <div className="flex flex-col gap-1.5 justify-start w-full">
                    <label className="text-nor">
                      Interests
                      <span className="text-grey"> (maximum 5)</span>
                    </label>
                    <div className="w-full flex flex-wrap gap-2 items-center py-1.5 px-3 text-nor border min-h-10 border-black rounded">
                      {tags.map((item: ICustom, i: number) => (
                        <span
                          key={i}
                          className="py-0.5 px-2 flex items-center bg-[#f1f1f1] rounded text-sm"
                        >
                          {item.title}
                          <button
                            className="pl-2 text-grey"
                            onClick={() => onDelete(i)}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <input
                        id="tags"
                        type="text"
                        placeholder="add tag"
                        value={tag}
                        className="outline-none grow"
                        onChange={(e) => setTag(e.target.value)}
                        onKeyUp={onKeyUp}
                      />
                    </div>
                  </div>
                  <p className="text-grey text-[13px]">
                    Your interests are generated from the types of photos you
                    like, collect, and contribute.
                  </p>
                </div>
              </div>
              <p className="font-bold text-lg my-4">Social</p>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col gap-1.5 w-1/2">
                  <Input
                    label="Instagram username"
                    value={updateUser?.instagram_username || ""}
                    onChange={(e) =>
                      handleOnChange("instagram_username", e.target.value)
                    }
                    icon
                  />
                  <p className="text-grey text-[13px]">
                    So that we can feature you on{" "}
                    <span className="underline">@unsplash</span>
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 w-1/2">
                  <Input
                    label="Twitter username"
                    value={user?.twitter_username || ""}
                    onChange={(e) => console.log(e.target.value)}
                    icon
                  />
                  <p className="text-grey text-[13px]">
                    So that we can feature you on{" "}
                    <span className="underline">@unsplash</span>
                  </p>
                </div>
              </div>
              <p className="font-bold text-lg my-4">Donations</p>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col gap-1.5 w-1/2">
                  <Input
                    label="PayPal email or username for donations"
                    placeholder="name@domain.com"
                    value={user?.social?.paypal_email || ""}
                    onChange={(e) => console.log(e.target.value)}
                  />
                  <p className="text-grey text-[13px]">
                    Note: This email/username will be public
                  </p>
                </div>
              </div>
              <button
                className="py-[9px] px-4 bg-black text-white rounded mt-4"
                onClick={handleUpdate}
              >
                Update account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
