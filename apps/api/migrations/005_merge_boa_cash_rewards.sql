-- Merge Bank of America Cash Rewards into Customized Cash Rewards (rebrand)
-- Old card: "Bank of America Cash Rewards Credit Card"
-- New card: "Bank of America Customized Cash Rewards Credit Card"

-- Store card IDs in variables
SET @old_card_name = 'Bank of America Cash Rewards Credit Card';
SET @new_card_name = 'Bank of America Customized Cash Rewards Credit Card';

SELECT @old_id := card_id FROM cards WHERE card_name = @old_card_name;
SELECT @new_id := card_id FROM cards WHERE card_name = @new_card_name;

-- Only proceed if both cards exist and IDs are different
-- Migrate records to new card
UPDATE records SET card_id = @new_id WHERE card_id = @old_id AND @old_id IS NOT NULL AND @new_id IS NOT NULL;

-- Migrate referrals to new card
UPDATE referrals SET card_id = @new_id WHERE card_id = @old_id AND @old_id IS NOT NULL AND @new_id IS NOT NULL;

-- Migrate user wallet cards to new card (handle duplicates by deleting old if user already has new)
DELETE uc_old FROM user_cards uc_old
INNER JOIN user_cards uc_new ON uc_old.user_id = uc_new.user_id
WHERE uc_old.card_id = @old_id AND uc_new.card_id = @new_id;

UPDATE user_cards SET card_id = @new_id WHERE card_id = @old_id AND @old_id IS NOT NULL AND @new_id IS NOT NULL;

-- Delete the old card entry
DELETE FROM cards WHERE card_id = @old_id AND @old_id IS NOT NULL;
