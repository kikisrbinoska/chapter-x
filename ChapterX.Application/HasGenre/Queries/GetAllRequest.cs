using MediatR;

namespace ChapterX.Application.HasGenre.Queries
{
    public record GetAllRequest() : IRequest<GetAllResponse>;
}
