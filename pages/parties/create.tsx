import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PartyForm } from 'types/partyTypes';
import PartyCreate, { partyInitForm } from 'components/party/PartyCreate';

export default function PartyCreatePage() {
  const [partyForm, setPartyForm] = useState<PartyForm>(partyInitForm);
  const router = useRouter();
  const createStep = router.query['step'];

  useEffect(() => {
    !(
      createStep === 'category' ||
      createStep === 'template' ||
      createStep === 'detail'
    ) && router.replace(`${router.pathname}?step=category`);
  }, []);

  function updatePartyForm(data: Partial<PartyForm>) {
    setPartyForm({
      ...partyForm,
      ...data,
    });
  }

  return createStep === 'category' ? (
    <PartyCreate.CategorySelection updatePartyForm={updatePartyForm} />
  ) : createStep === 'template' ? (
    <PartyCreate.TemplateSelection
      categoryId={partyForm.categoryId}
      updatePartyForm={updatePartyForm}
    />
  ) : createStep === 'detail' ? (
    <PartyCreate.DetailCustomization
      partyForm={partyForm}
      updatePartyForm={updatePartyForm}
    />
  ) : undefined;
}
