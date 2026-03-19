using MediatR;

namespace ChapterX.Application.HasGenre.Commands
{
    public record AddRequest(int StoryId, int GenreId) : IRequest<AddResponse>;
}
