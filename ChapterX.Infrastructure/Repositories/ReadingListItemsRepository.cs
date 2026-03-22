using ChapterX.Domain.Entities;
using ChapterX.Domain.Repositories;
using ChapterX.Infrastructure.Data.DataContext;
using Microsoft.EntityFrameworkCore;

namespace ChapterX.Infrastructure.Repositories
{
    public class ReadingListItemsRepository : GenericRepository<ReadingListItems>, IReadingListItemsRepository
    {
        public ReadingListItemsRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<bool> ExistsAsync(int listId, int storyId, CancellationToken cancellationToken = default)
            => await _dbSet.AnyAsync(i => i.ListId == listId && i.StoryId == storyId, cancellationToken);
    }
}
