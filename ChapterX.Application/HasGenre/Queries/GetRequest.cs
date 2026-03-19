using MediatR;

namespace ChapterX.Application.HasGenre.Queries
{
    public record GetRequest(int Id) : IRequest<GetResponse>;
}
