"use client";

import { startTransition, useEffect, useState } from "react";
import {
  Combobox,
  ComboboxItem,
  ComboboxList,
  ComboboxProvider,
} from "@ariakit/react";
import * as Select from "@radix-ui/react-select";

import getUserTimezone from "@/queries/get-user-timezone";
import upsertUserTimezone from "@/mutations/upsert-user-timezone";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import getTimezones from "@/utils/get-timezones";
import { createClient } from "@/lib/supabase/client";

const availableTimezones = getTimezones();
const supabase = createClient();

export default function GeneralSettingsPage() {
  const [open, setOpen] = useState(false);
  const [currentUserTimezone, setCurrentUserTimezone] = useState<string>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [filteredTimezones, setFilteredTimezones] =
    useState(availableTimezones);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    renderCurrentUserTimezone();
  }, []);

  async function renderCurrentUserTimezone() {
    setLoading(true);
    const { data } = await getUserTimezone();

    setCurrentUserTimezone(data ? data[0]?.timezone : null);
    setLoading(false);
  }

  async function handleUpdateUserTimezone(value: string) {
    setLoading(true);

    setCurrentUserTimezone(value);
    const user = await supabase.auth.getUser();
    await upsertUserTimezone(value, user.data.user!.id);
    setLoading(false);
  }

  return (
    <div className="flex flex-col ml-8 p-5 gap-4 w-full">
      <h2 className="font-bold">User's preferred timezone</h2>
      {loading && <span>Loading...</span>}
      {!loading && (
        <Select.Root
          open={open}
          onOpenChange={setOpen}
          value={currentUserTimezone}
          onValueChange={handleUpdateUserTimezone}
        >
          <ComboboxProvider
            open={open}
            setOpen={setOpen}
            resetValueOnHide
            includesBaseElement={false}
            setValue={(value) => {
              startTransition(() => {
                setFilteredTimezones(
                  availableTimezones.filter(
                    (t) =>
                      t!.name
                        .toLocaleLowerCase()
                        .includes(value.toLocaleLowerCase()) ||
                      t!.offsetString
                        .toLocaleLowerCase()
                        .includes(value.toLocaleLowerCase())
                  )
                );
              });
            }}
          >
            <Select.Trigger
              aria-label="Timezone"
              className="hover:bg-blue-50 text-black pl-2 inline-flex h-10 shadow-sm items-center gap-1 rounded-sm scheme-light w-96"
            >
              <Select.Value placeholder="Select a timezone" />
            </Select.Trigger>
            <Select.Content
              role="dialog"
              aria-label="Timezones"
              position="popper"
              className="z-50 w-96 rounded-b-lg bg-white shadow-sm scheme-light scroll-auto"
              sideOffset={4}
            >
              <div className="relative flex items-center p-1 pb-0 2-96">
                <MagnifyingGlassIcon height="16" width="16" />
                <Combobox
                  className="h-10 appearance-none rounded-b-sm pr-2 pl-7 text-black w-96"
                  autoSelect
                  placeholder="Search timezones"
                  // Ariakit's Combobox manually triggers a blur event on virtually
                  // blurred items, making them work as if they had actual DOM
                  // focus. These blur events might happen after the corresponding
                  // focus events in the capture phase, leading Radix Select to
                  // close the popover. This happens because Radix Select relies on
                  // the order of these captured events to discern if the focus was
                  // outside the element. Since we don't have access to the
                  // onInteractOutside prop in the Radix SelectContent component to
                  // stop this behavior, we can turn off Ariakit's behavior here.
                  onBlurCapture={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                />
              </div>
              <ComboboxList className="overflow-y-auto pl-2 pt-2 h-96">
                {filteredTimezones.map((t) => (
                  <Select.Item
                    key={t!.name}
                    value={t!.name}
                    asChild
                    className="relative flex h-10 cursor-default scroll-my-1 items-center rounded-b-sm px-7 text-black outline-hidden data-active-item:bg-blue-50 w-96"
                  >
                    <ComboboxItem>
                      <Select.ItemIndicator className="absolute left-3 font-bold">
                        <span>*</span>
                      </Select.ItemIndicator>
                      <Select.ItemText>{`${t!.name} ${t!.offsetString}`}</Select.ItemText>
                    </ComboboxItem>
                  </Select.Item>
                ))}
              </ComboboxList>
            </Select.Content>
          </ComboboxProvider>
        </Select.Root>
      )}
    </div>
  );
}
