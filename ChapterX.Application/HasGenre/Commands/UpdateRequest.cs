using MediatR;

namespace ChapterX.Application.HasGenre.Commands
{
    public record UpdateRequest(int Id, int StoryId, int GenreId) : IRequest<UpdateResponse>;
}
