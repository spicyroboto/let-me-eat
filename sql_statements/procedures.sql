use heroku_e52fec4ca086f6b;

DELIMITER $$

create procedure update_reliabilityIndex (in review_id INTEGER)
begin

declare upvote_count integer;
declare new_index char(20);

select upVotes into upvote_count
from user_review
where reviewId = review_id;

if upvote_count <= 4 then
  set new_index = 'undecided';
elseif upvote_count <= 9 then
  set new_index = 'may be reliable';
else
  set new_index = 'reliable';
end if;

update user_review set reliabilityIndex = new_index where reviewId = review_id;

end$$

DELIMITER ;