using ChapterX.Domain.Entities;
using ChapterX.Domain.Repositories;
using ChapterX.Infrastructure.Data.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace ChapterX.Infrastructure.Repositories
{
    public class CommentRepository : GenericRepository<Comment>, ICommentRepository
    {
        public CommentRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Comment>> GetByChapterIdAsync(int chapterId, CancellationToken cancellationToken = default)
            => await _dbSet.Where(c => c.StoryId == chapterId).ToListAsync(cancellationToken);

        public async Task<IEnumerable<Comment>> GetByStoryIdAsync(int storyId, CancellationToken cancellationToken = default)
            => await _dbSet
                .Include(c => c.User)
                .Where(c => c.StoryId == storyId)
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync(cancellationToken);
    }
}
